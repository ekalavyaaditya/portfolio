import { Container, Typography, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";

const categorizedSkills = {
  "Programming Languages": ["Java", "Python", "JavaScript", "SQL", "C", "HTML", "CSS"],
  "Frameworks & Libraries": ["Angular", "React", "Node.js", "Express", "Spring Boot", "Django"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
  "Cloud Platforms & DevOps": [
    "AWS",
    "GCP",
    "Jenkins",
    "Git",
    "Docker"
  ],
  "Tools & Environments": ["VS Code", "GitHub", "Eclipse", "PyCharm", "Windows", "Ubuntu"],
  "Emerging Tech": ["Blockchain (Ethereum)", "Web3.js", "Solidity"]
};

export default function Skills() {
  return (
    <Container id="skills" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom>
        Skills
      </Typography>
      {Object.entries(categorizedSkills).map(([category, skills], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
          viewport={{ once: true }}
        >
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {skills.map((skill, skillIndex) => (
              <Grid item key={skill}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Chip label={skill} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      ))}
    </Container>
  );
}