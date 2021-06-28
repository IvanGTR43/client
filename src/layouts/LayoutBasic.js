import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import Footer from '../components/Web/Footer';
import "../config/routes"
export default function LayoutBasic({routes}) {
    const {Header, Content} = Layout;
    return(
        <>
        <Row>
            <Col lg={4}/>
            <Col lg={16}>
                <MenuTop/>
            </Col>
            <Col lg={4}/>
        </Row>
        <Content><LoadRoutesB routes={routes}/></Content>
        <Footer/>
    </>
    );
    // return(
    //     <Layout>
    //         <h2>Layout Basic</h2>
    //        <Header>Header Teext</Header>
    //        <Content><LoadRoutesB routes={routes}/></Content>
    //        <Footer>Footer de Basci</Footer>
    //     </Layout>
    // )
};

function LoadRoutesB({routes}){
    return(
        <Switch>
            {routes.map((route, index)=>(
                <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />
            ))}
        </Switch>
    )
}
