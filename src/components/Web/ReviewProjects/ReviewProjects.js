import React from 'react';
import { Row, Col, Card, Avatar } from "antd";
import "./ReviewProjects.scss";
import AvatarPersona from "../../../assets/img/png/avatar-persona.png";
export default function ReviewProjects() {
  return (
    <div className="review-projects">
      <Row>
        <Col lg={4}/>
        <Col lg={16} className="review-projects__title">
          <h2>Forma parte de los 35 mil estuduantes</h2>
        </Col>
        <Col lg={4}/>
      </Row>
      <Row >
        <Col lg={4}/>
        <Col lg={16}>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Ivan Gabriel"
                subtitle="Muy Buena App"
                avatar={AvatarPersona}
                review="Me gusto el diseño de la App"/>
            </Col>
            <Col md={8}>
              <CardReview
                name="Ivan Gabriel"
                subtitle="Muy Buena App"
                avatar={AvatarPersona}
                review="Me gusto el diseño de la App"/>
            </Col>
            <Col md={8}>
              <CardReview
                name="Ivan Gabriel"
                subtitle="Muy Buena App"
                avatar={AvatarPersona}
                review="Me gusto el diseño de la App"/>
            </Col>
          </Row>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Ivan Gabriel"
                subtitle="Muy Buena App"
                avatar={AvatarPersona}
                review="Me gusto el diseño de la App"/>
            </Col>
            <Col md={8}>
              <CardReview
                name="Ivan Gabriel"
                subtitle="Muy Buena App"
                avatar={AvatarPersona}
                review="Me gusto el diseño de la App"/>
            </Col>
            <Col md={8}>
              <CardReview
                name="Ivan Gabriel"
                subtitle="Muy Buena App"
                avatar={AvatarPersona}
                review="Me gusto el diseño de la App"/>
            </Col>
          </Row>
        </Col>
        <Col lg={4}/>
      </Row>
    </div>
  );
};

function CardReview(props){
  const { name, subtitle, avatar, review } = props;
 const { Meta } = Card;
  return(
    <Card className="review-projects__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar}/>}
        title={name}
        description={subtitle}
        />
    </Card>
  );

}