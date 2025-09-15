import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 3,
        py: 4,
        textAlign: "center",
        bgcolor: "#001F3F", // matches header's blue tone
        color: "#f0f0f0",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        © {new Date().getFullYear()} Ekalavya Aditya. All rights reserved.
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        Designed with React & MUI •{" "}
        <Link
          href="https://github.com/ekalavyaaditya"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: "#90CAF9" }}
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
}
