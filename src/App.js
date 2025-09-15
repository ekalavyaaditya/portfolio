import { Container, Typography, Button, Avatar, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import Header from "./components/Header";
import TextType from "./textType/TextType";
import Skills from "./sections/Skills";
import Footer from "./components/Footer";
import Projects from "./sections/Projects";

export default function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 14, pb: 0, pl: 0, pr: 0 }}>
        <motion.div
          id="hero"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Avatar
                src="https://via.placeholder.com/150"
                sx={{
                  width: 180,
                  height: 180,
                  mx: "auto",
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h2"
                gutterBottom
                fontWeight="bold"
                sx={{ minHeight: "3.5rem" }}
              >
                Ekalavya Aditya
              </Typography>

              <Typography variant="h6" color="text.secondary">
                <TextType
                  text={[
                    "Full Stack Web Developer",
                    "MERN",
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </Typography>
              <Button variant="contained" sx={{ mt: 3 }} href="#contact">
                Let's Connect
              </Button>
            </Grid>
          </Grid>
        </motion.div>

        {/* About Section */}
        <motion.div
          id="about"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: "6rem" }}
        >
          <Typography variant="h4" gutterBottom fontWeight={600}>
            About Me
          </Typography>
          <Typography sx={{ maxWidth: "700px" }}>
            I build scalable, beautiful user experiences with full-stack
            technologies. My specialty is React, MUI, and backend REST APIs.
          </Typography>
        </motion.div>

        {/* Skills Section */}
        <Skills />
        <Projects />
        {/* Contact Section */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Get in Touch
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                startIcon={<Email />}
                href="mailto:ekalavyaaditya@gmail.com"
                variant="outlined"
                size="large"
              >
                Email
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<GitHub />}
                href="https://github.com/ekalavyaaditya"
                variant="outlined"
                size="large"
              >
                GitHub
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<LinkedIn />}
                href="https://linkedin.com/in/ekalavya-aditya"
                variant="outlined"
                size="large"
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>
        </motion.div>
        {/* Footer */}
      </Container>
      <Footer />
    </>
  );
}
