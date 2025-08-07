"use client";

import { useAuth } from '@/context/authContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('users', response?.data?.users);

        setUsers(response.data.users);
      } catch (error) {
        console.log('err', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/projects', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('projects', res?.data);




        setProjects(res.data);
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

      setProjects((prev) => [...prev, response.data.project]);
    } catch (error) {
      toast.error('Failed to add project');
      console.log('error', error);
    }
  };


  console.log("Type:", typeof projects);

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
      {projectModal && (
        <div className="bg-white shadow p-4 rounded-lg mb-6 text-black">
          <h2 className="text-xl font-semibold mb-3">Add Project</h2>

          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2 text-black"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2 text-black"
          ></textarea>

          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2 text-black"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2 text-black"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleInputChange}
              className="p-2 border rounded text-black"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleInputChange}
              className="p-2 border rounded text-black"
            />
          </div>

          <div className="mb-4">
            <p className="font-medium mb-2">Select Members:</p>
            <div className="grid grid-cols-2 gap-2 text-black">
              {users.map((user) => (
                <label key={user._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.members.includes(user._id)}
                    onChange={() => handleMemberToggle(user._id)}
                  />
                  <span>{user.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="bg-gray-300 px-4 py-2 rounded text-black" onClick={() => setProjectModal(false)}>
              Cancel
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddProject}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Project List */}
      {projects ? (
        projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              const memberNames = users
                .filter((user) => project.members.includes(user._id))
                .map((user) => user.name)
                .join(', ');

              return (
                <div
                  key={project._id}
                  className="bg-white text-black p-4 rounded shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="mb-2 text-gray-700">{project.description}</p>
                  <div className="text-sm text-gray-600 mb-2">
                    <p>Status: <span className="font-medium">{project.status}</span></p>
                    <p>Priority: <span className="font-medium">{project.priority}</span></p>
                    <p>Duration: {project.startDate} → {project.endDate}</p>
                    <p>Members: {memberNames || 'None'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No projects found.</p>
        )
      ) : (
        <p>Loading...</p>
      )}


    </div>

  );
}

export default Projects;
