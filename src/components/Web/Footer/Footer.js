import React from 'react';
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";
import NewsLetter from "../NewsLetter";
import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <Row>
        <Col md={4}/>
        <Col md={16}>
          <Row>
            <Col lg={8}><MyInfo /></Col>
            <Col lg={8}><NavigationFooter /></Col>
            <Col lg={8}><NewsLetter /></Col>
          </Row>
          <Row className="footer__copyriht">
            <Col lg={12}>
              CopyRight
            </Col>
            <Col lg={12}>
              Ivan Gabriel Tacuapan Reyes | desarrollador Web y movil
            </Col>
          </Row>
        </Col>
        <Col md={4}/>
      </Row>
    </Footer>
  )
}
