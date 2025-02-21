import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';


const About = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: '40px 20px' }}>
      {/* Project Introduction */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        About the Blog Management System
      </Typography>
      <Paper sx={{ padding: '20px', backgroundColor: '#f9f9f9', marginBottom: '30px' }}>
        <Typography style={{ fontWeight:'600', justifyContent:'left'}} variant="body1" paragraph>
          In the rapidly evolving digital landscape, blogging has become an essential medium for individuals
          and businesses to share ideas, information, and engage with their audience. It involves a comprehensive
          system for content creation. The "Blog Management System" project aims to streamline these processes,
          offering a user-friendly platform that enhances the efficiency and effectiveness of blog management.
        </Typography>
        <Typography style={{ fontWeight:'600', justifyContent:'left'}} variant="body1" paragraph>
          We will create a blog website where users can create, edit, and delete posts, and visitors can leave
          comments. With the help of MERN Stack Technologies, we are going to create this website, for frontend (ReactJS
          and Material UI), for backend (NodeJS and ExpressJS), and for database (MongoDB).
        </Typography>
        <Typography style={{ fontWeight:'600', justifyContent:'left'}} variant="body1" paragraph>
          In conclusion, as the digital world continues to grow and evolve, having a robust and intuitive management
          system for blogging is crucial for staying competitive and engaging with wider audiences. By adopting this system,
          users can improve productivity, enhance content quality, and ultimately lead to sustained growth and success in
          their blogs.
        </Typography>
      </Paper>

      {/* Technologies Used Section */}
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Technologies Used
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Frontend
            </Typography>
            <Typography variant="body1">ReactJS</Typography>
            <Typography variant="body1">Material UI</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Backend
            </Typography>
            <Typography variant="body1">NodeJS</Typography>
            <Typography variant="body1">ExpressJS</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Database
            </Typography>
            <Typography variant="body1">MongoDB</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Team Members Section */}
      <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        Our Team
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
            <Typography variant="h6">Sanesh Pushkarna</Typography>
            <Typography variant="body2">Backend Developer</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
            <Typography variant="h6">Vishal</Typography>
            <Typography variant="body2">Project Manager</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
            <Typography variant="h6">Sandeep</Typography>
            <Typography variant="body2">Frontend Developer</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;

    
