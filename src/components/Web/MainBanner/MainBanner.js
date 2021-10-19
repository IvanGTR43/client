import React from 'react';
import { Row, Col } from "antd";
import "./MainBanner.scss";
export default function MainBanner(props) {
  return(
  <div className="main-banner">
    <div className="main-banner__dark">
      <Row>
        <Col lg={4}>
        </Col>
        <Col lg={16} className="description">
          <h2>Ing. Ivan Gabriel Tacuapan Reyes</h2>
          <h3>Profesional con gusto por el desarrollo de aplicaciones y sistemas Web
          Y en constante aprendizaje tomando cursos y desarrollando nuevas ideas.</h3>
        </Col>
        <Col lg={4}>
        </Col>
      </Row>
    </div>
  </div>);
};
