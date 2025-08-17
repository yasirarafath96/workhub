import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography
} from '@mui/material';

function ProjectsTable({ projects, users }) {
  const getUserById = (id) => users.find((u) => u._id === id);

  return (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Priority</b></TableCell>
            <TableCell><b>Members</b></TableCell>
            <TableCell><b>Start Date</b></TableCell>
            <TableCell><b>End Date</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project._id}
              hover
              sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {project.description || '—'}
                </Typography>
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{project.status}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{project.priority}</TableCell>
              <TableCell>
                {project.members.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {project.members.map((id) => {
                      const user = getUserById(id);
                      return (
                        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar
                            sx={{
                              bgcolor: '#2196f3',
                              width: 28,
                              height: 28,
                              fontSize: '0.8rem'
                            }}
                          >
                            {user?.name?.charAt(0) || '?'}
                          </Avatar>
                          <Typography variant="body2">{user?.name || 'Unknown User'}</Typography>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Typography variant="body2" color="text.secondary">No Members</Typography>
                )}
              </TableCell>
              <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable;
