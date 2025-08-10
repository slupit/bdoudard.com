import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-5 bg-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Container>
        <h2>About Me</h2>
        <p>I am an operation research enthusiast with a background in mathematical modeling and optimization. My skills include:</p>
        <ul>
          <li>Linear Programming</li>
          <li>Integer Programming</li>
          <li>Network Flow Models</li>
          <li>Simulation</li>
          <li>Data Analysis</li>
        </ul>
      </Container>
    </motion.section>
  );
};

export default About;
