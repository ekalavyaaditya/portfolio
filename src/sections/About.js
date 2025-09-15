import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Box id="about" sx={{ py: 10 }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>About Me</Typography>
          <Typography variant="body1">
            I’m a passionate developer with experience in React, Node.js, Django, and more.
            I love building beautiful interfaces and robust backends.
          </Typography>
        </Container>
      </motion.div>
    </Box>
  );
}
