import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="py-5 bg-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Container>
        <h2>Contact Me</h2>
        <p>Email: your.email@example.com</p>
        <p>LinkedIn: <a href="#">LinkedIn Profile</a></p>
        <p>GitHub: <a href="#">GitHub Profile</a></p>
      </Container>
    </motion.section>
  );
};

export default Contact;
