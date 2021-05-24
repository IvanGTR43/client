import React from 'react';
import { Route } from "react-router-dom";
import { Layout } from "antd";
import "../config/routes"
export default function LayoutBasic({routes}) {
    const {Header, Content, Footer} = Layout;
    return(
        <Layout>
            <h2>Layout Basic</h2>
           <Header>Header Teext</Header>
           <Content><LoadRoutesB routes={routes}/></Content>
           <Footer>Footer de Basci</Footer>
        </Layout>
    )
};

function LoadRoutesB({routes}){
    return routes.map((route, index)=>(
        <Route key={index} path={route.path} component={route.component} exact={route.exact}/>
    ))
}
