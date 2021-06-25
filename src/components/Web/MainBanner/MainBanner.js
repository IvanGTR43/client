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
        <Col lg={16}>
          <h2>Aprender Nuevas <br/> tecnologias Weby Movil</h2>
          <h3>A traves de curos practicos, concisos uy actualizados, creados por <br/> profesionales con años de experiencia</h3>
        </Col>
        <Col lg={4}>
        </Col>
      </Row>
    </div>
  </div>);
};
