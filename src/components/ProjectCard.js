import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <a href="#" className="btn btn-primary">View Details</a>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
