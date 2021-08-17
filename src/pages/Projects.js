import React from 'react';
import { Row, Col } from "antd";
import ProjectCard from "../components/Web/ProjectCard";

export default function Projects() {
  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        <ProjectCard />
      </Col>
      <Col md={4} />
    </Row>
  )
}
