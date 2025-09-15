import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <Box sx={{ py: 10, textAlign: 'center' }} id="hero">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" gutterBottom>Hi, I'm Aditya</Typography>
          <Typography variant="h5">Full Stack Developer & Creator</Typography>
        </Container>
      </motion.div>
    </Box>
  );
}
