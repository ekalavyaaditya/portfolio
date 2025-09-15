import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

export default function Contact() {
  return (
    <Container id="contact" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom>Contact Me</Typography>
      <Box component="form" action="mailto:youremail@example.com" method="post" encType="text/plain">
        <TextField fullWidth margin="normal" label="Your Name" name="name" />
        <TextField fullWidth margin="normal" label="Your Email" name="email" />
        <TextField fullWidth margin="normal" label="Message" name="message" multiline rows={4} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send</Button>
      </Box>
    </Container>
  );
}
