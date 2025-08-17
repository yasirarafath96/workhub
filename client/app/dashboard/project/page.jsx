"use client";

import { GetAllProjects, GetAllUsers } from '@/api/queries/user';
import ProjectsTable from '@/components/ProjectsTable';
import { useAuth } from '@/context/authContext';
import { Modal, Box, Typography, TextField, MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

function Projects() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectModal, setProjectModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    status: '',
    priority: '',
    startDate: '',
    endDate: '',
    members: [],
  });

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        const { data } = await GetAllUsers();

        console.log('users', data?.users);
        setUsers(data?.users);

        // console.log('users', response?.data?.users);
        // setUsers(response.data.users);

      } catch (error) {
        console.log('err', error);
      }
    };

    const fetchProjects = async () => {

      try {
        const { data } = await GetAllProjects();

        console.log('projects', data);
        setProjects(data);

        // console.log('projects', res?.data);
        // console.log('projects', res?.data);
        // setProjects(res.data);

      } catch (err) {
        console.log('Failed to fetch projects:', err);
      }
    };

    fetchUsers();
    fetchProjects();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMemberToggle = (id) => {
    setForm((prev) => {
      const exists = prev.members.includes(id);
      const newMembers = exists
        ? prev.members.filter((mid) => mid !== id)
        : [...prev.members, id];
      return { ...prev, members: newMembers };
    });
  };

  const handleAddProject = async () => {
    if (!form.name || !form.status || !form.priority) {
      toast.error('Required fields missing');
      return;
    }

    const payload = {
      ...form
    };

    console.log('project payload', payload);

    console.log('accessToken', accessToken);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/projects',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('res', response?.data);

      toast.success('Project added successfully');
      setProjectModal(false);

      setForm({
        name: '',
        description: '',
        status: '',
        priority: '',
        startDate: '',
        endDate: '',
        members: [],
      });

      setProjects((prev) => [...prev, response.data]);
    } catch (error) {
      toast.error('Failed to add project');
      console.log('error', error);
    }
  };

  const getUserNameById = (id) => {
    const user = users.find((u) => u._id === id);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="bg-amber-100 min-h-screen p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      <div className="flex justify-between items-center mb-4">
        <p>Project List</p>
        <button
          className="bg-sky-500 text-white px-4 py-2 rounded"
          onClick={() => setProjectModal(true)}
        >
          Add Project
        </button>
      </div>

      {/* Project Modal */}
      <Modal
        open={projectModal}
        onClose={() => setProjectModal(false)}
        aria-labelledby="add-project-title"
      >
        <Box sx={{ ...modalStyle, color: 'black' }}>
          <Typography id="add-project-title" variant="h6" sx={{ mb: 2 }}>
            Add Project
          </Typography>

          <TextField
            fullWidth
            label="Project Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            InputLabelProps={{ sx: { color: 'black' } }}
            sx={{ mb: 2, input: { color: 'black' } }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="on-hold">On Hold</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Priority</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
          </TextField>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              InputLabelProps={{ shrink: true }}
              value={form.startDate}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              type="date"
              label="End Date"
              name="endDate"
              InputLabelProps={{ shrink: true }}
              value={form.endDate}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 1, color: 'black' }}>
            Select Members
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
            {users.map((user) => (
              <FormControlLabel
                sx={{ color: 'black' }}
                key={user._id}
                control={
                  <Checkbox
                    checked={form.members.includes(user._id)}
                    onChange={() => handleMemberToggle(user._id)}
                  />
                }
                label={user.name}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => setProjectModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleAddProject}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* <div className='flex-col w-full bg-white'>
        <div className='flex-row gap-2 flex justify-between mb-1 bg-blue-300 p-3'>
          <p className='flex-[1]' >Name</p>
          <p className='flex-[1]' >Description</p>
          <p className='flex-[1]' >Status</p>
          <p className='flex-[1]' >Priority</p>
          <p className='flex-[1]' >Members</p>
          <p className='flex-[1]' >StartDate</p>
          <p className='flex-[1]' >EndDate</p>
        </div>

        {projects.map((item) => {
          return (
            <div
              key={item._id}
              className="flex-row gap-2 flex justify-between py-3 bg-blue-400 p-3"
            >
              <p className='flex-[1]'>{item.name}</p>
              <p className='flex-[1]'>{item.description}</p>
              <p className='flex-[1]'>{item.status}</p>
              <p className='flex-[1]'>{item.priority}</p>
              <select
                name="priority"
                value={form.priority}
                // onChange={handleInputChange}
                className="w-full p-2 border rounded text-black flex-[1]"
              >
                {item.members.map((item) => <div>
                  <p>
                    <option value={getUserNameById(item)}>{getUserNameById(item)}</option>

                  </p>
                </div>)}
              </select>
              <p className='flex-[1]'>{new Date(item.startDate).toLocaleDateString()}</p>
              <p className='flex-[1]'>{new Date(item.endDate).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div> */}

      <ProjectsTable projects={projects} users={users} />
    </div>

  );
}

export default Projects;
