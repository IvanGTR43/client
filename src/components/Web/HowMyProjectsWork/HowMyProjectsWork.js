import React from 'react';
import { Row, Col, Card } from "antd";
import {} from "@ant-design/icons";
import "./HowMyProjectsWork.scss";
export default function HowMyProjectsWork(props) {
  return(
    <Row className="how-my-projects-work">
      <Col lg={24} className="how-my-projects-work__title">
        <h2>Como Funcionan mis Proyectos</h2>
        <h3>Todos los proyectos son elaborados por mi</h3>
      </Col>
      <Col lg={4}/>
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}><CardInfo /></Col>
        </Row>
      </Col>
      <Col lg={4}/>
    </Row>
  );
};

function CardInfo(props){
  const { scon, title, subtitle } = props;
  const { Meta } = Card;
  return("Card");
}
