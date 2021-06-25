import React from 'react';
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import Project1 from "../../../assets/img/png/5tenedores.png";
import "./HomeProjects.scss";
export default function HomeProjects(props) {
  return(
    <Row className="home-projects">
      <Col lg={24} className="home-projects__title">
        <h2>Proyectos</h2>
      </Col>
      <Col lg={4}/>
      <Col lg={16}>
        <Row className="row-projects">
          <Col md={6}>
            <CardProject
              title="Encuentra Restaurntes"
              subtitle="React Native - Aplicacion Movil"
              link="https://expo.io/"
              image={Project1}/>
          </Col>
          <Col md={6}>
            <CardProject
              title="Gestion de Maquinaria"
              subtitle="Web - HTML y PHP"
              link="https://expo.io/"
              image={Project1}/>
          </Col>
          <Col md={6}>
            <CardProject
              title="Web Personal"
              subtitle="MERN Stack"
              link="https://expo.io/"
              image={Project1}/>
          </Col>
          <Col md={6}>
            <CardProject
              title="Encuentra Restaurntes"
              subtitle="React Native - Aplicacion Movil"
              link="https://expo.io/"
              image={Project1}/>
          </Col>
        </Row>
      </Col>
      <Col lg={4}/>
      <Col lg={24} className="home-projects__more">
        <Link to={"/projects"}><Button>Ver Más</Button></Link>
      </Col>
    </Row>

  );
};

function CardProject(props){
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;
  return(
    <a
      href={link}
      target="_blank"
      rel="noopeer noreferrer">
        <Card
          className="home-projects__card"
          cover={<img src={image} alt={title} />}
          actions={[<Button>Ver Proyecto</Button>]}>
            <Meta title={title} description={subtitle}>
            </Meta>
        </Card>
      </a>
  );
}
