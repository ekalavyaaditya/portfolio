import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const projects = [
  {
    name: 'Portfolio Website',
    description: 'This very site built with React and MUI.',
    github: 'https://github.com/yourname/portfolio',
    live: 'https://your-portfolio.com'
  },
  {
    name: 'Task Manager',
    description: 'Full-stack app using Django + React.',
    github: 'https://github.com/yourname/task-manager',
    live: '#'
  },
];

export default function Projects() {
  return (
    <Container id="projects" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={project.github}>GitHub</Button>
                <Button size="small" href={project.live}>Live</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
