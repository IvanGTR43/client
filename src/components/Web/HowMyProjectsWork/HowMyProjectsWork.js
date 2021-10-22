import React from 'react';
import { Row, Col, Card } from "antd";
import { ClockCircleOutlined, KeyOutlined } from "@ant-design/icons";
import { MdTrendingUp, MdRecommend, MdDoneAll } from "react-icons/md"

import "./HowMyProjectsWork.scss";
export default function HowMyProjectsWork(props) {
  return(
    <Row className="how-my-projects-work">
      <Col lg={24} className="how-my-projects-work__title">
        <h2>Como Funcionan mis Proyectos</h2>
        <h3>Todos los proyectos son hechos por mi</h3>
      </Col>
      <Col lg={4}/>
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              title="Proyectos"
              subtitle="Proyectos hechos por mi, adecuandolos a cada meta"
              icon={<ClockCircleOutlined/>}/>
          </Col>
          <Col md={8}>
            <CardInfo
              title="Privacidad"
              subtitle="Todos los datos sensibles del sistema son cifrados antes de ser guardarlos en la nube"
              icon={<KeyOutlined />}/>
          </Col>
          <Col md={8}>
            <CardInfo
              title="Soporte"
              subtitle="Se utilizan teconologias que son de gran uso por la comunidad de programadores"
              icon={ <MdRecommend /> }/>
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              title="Escalabilidad"
              subtitle="Proyectos construidos para poder agregar mas funciones progresivamente"
              icon={ <MdTrendingUp/> }/>
          </Col>
          <Col md={8}>
            <CardInfo
              title="Privacidad"
              subtitle="Todos los datos sensibles del sistema son cifrados antes de Guardarlos en la Nube"
              icon={<KeyOutlined />}/>
          </Col>
          <Col md={8}>
            <CardInfo
              title="Multiplataforma"
              subtitle="Apps Moviles para Android y iOS con la misma interfaz y mismo codigo fuente"
              icon={<MdDoneAll />}/>
          </Col>
        </Row>
      </Col>
      <Col lg={4}/>
    </Row>
  );
};

function CardInfo(props){
  const { icon, title, subtitle } = props;
  const { Meta } = Card;
  return(
    <Card className="how-my-projects-work__card">
      {icon}
      <Meta
        title={title}
        description={subtitle}/>
    </Card>
  );
}
