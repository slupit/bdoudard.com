import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'Supply Chain Optimization',
    description: 'Optimized the supply chain for a hypothetical company to minimize costs and maximize efficiency using linear programming.',
  },
  {
    title: 'Scheduling Problems',
    description: 'Solved a job scheduling problem to minimize completion time using integer programming.',
  },
  {
    title: 'Inventory Management',
    description: 'Developed a model to manage inventory levels to minimize holding and shortage costs using stochastic modeling.',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-5">
      <Container>
        <h2>Projects</h2>
        <Row>
          {projects.map((project, index) => (
            <Col md={4} className="mb-4" key={index}>
              <ProjectCard title={project.title} description={project.description} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
