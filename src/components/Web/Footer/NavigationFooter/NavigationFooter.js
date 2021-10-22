import React from 'react';
import { Row, Col } from "antd";
import { AndroidFilled, ContactsFilled, CodeTwoTone, DatabaseTwoTone, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Row>
        <Col md={24}>
          <h3>Desarrollo Web y Móvil</h3>
        </Col>
      </Row>
      <Row>
        {/* <Col md={12}>
          <RenderListLeft />
        </Col> */}
        <Col md={24}>
          <RenderListRight />
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
        <a href="#"><AndroidFilled />Descargar Aplicaciones</a>
      </li>
      <li>
        <Link to="/contacts"><ContactsFilled />Contacto</Link>
      </li>
      <li>
        <Link to="/contacts"><DatabaseTwoTone /> Bases de Datos</Link>
      </li>
      v<li>
        <Link to="/contacts"><CodeTwoTone /> Desarrollo Web</Link>
      </li>
      <li>
        <Link to="/contacts"><AndroidFilled />Desarrollo Android</Link>
      </li>
      <li>
        <Link to="/contacts"><RightOutlined />Politicas de Privacidad</Link>
      </li>
    </ul>
  );
}

function RenderListRight(props){
  const {} = props;
  return(
    <ul>
      <li>
        <a href="#"><AndroidFilled />Desarrollo de Aplicaciones</a>
      </li>
      <li>
        <Link to="#"><DatabaseTwoTone />Bases de Datos</Link>
      </li>
      v<li>
        <Link to="#"><CodeTwoTone /> Desarrollo Web</Link>
      </li>
      <li>
        <Link to="#"><AndroidFilled />Desarrollo Android</Link>
      </li>
    </ul>
  );
}