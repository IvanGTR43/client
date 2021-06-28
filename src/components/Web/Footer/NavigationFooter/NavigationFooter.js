import React from 'react';
import { Row, Col } from "antd";
import { AndroidFilled, ContactsFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Row>
        <Col md={24}>
          <h3>Navegacion</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <RenderListLeft />
        </Col>
        <Col md={12}>

        </Col>
      </Row>
    </Row>
  )
}

function RenderListLeft(props){
  const {} = props;
  return(
    <ul>
      <li>
        <a href="#"><AndroidFilled /> Deescargar Aplicaciones</a>
      </li>
      <li>
        <Link to="/contacts"><ContactsFilled /> Contacto</Link>
      </li>
    </ul>
  );
}