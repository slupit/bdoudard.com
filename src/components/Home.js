import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.section
      id="home"
      className="py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <h1>Welcome to My Website</h1>
        <p>I specialize in optimization, modeling, and data analysis to solve complex problems.</p>
        <Button variant="primary" href="#projects">View My Projects</Button>
      </Container>
    </motion.section>
  );
};

export default Home;
