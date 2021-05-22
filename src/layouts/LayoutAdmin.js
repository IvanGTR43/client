import React from 'react';
import { Route } from "react-router-dom"
import { Layout } from 'antd';
import "./LayoutAdmin.scss"
import rutes from '../config/routes';
export default function LayoutAdmin(props) {
    const {routes} = props;
    const {Header, Content, Footer} = Layout;
    return(
        <Layout>
            <h2>Layout Admin</h2>
            <Layout>
                <Header>
                    Hedeer
                </Header>
                <Content>
                    <LoadRouters routes={routes}/>
                </Content>
                <Footer>
                    ... Footer
                </Footer>
            </Layout>
        </Layout>
    )
};

function LoadRouters({routes}){
    return rutes.map((route, index) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
        />
    ))
}