import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { Layout } from 'antd';
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";
import "./LayoutAdmin.scss"
import '../config/routes';
export default function LayoutAdmin(props) {
    const {routes} = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const {Header, Content, Footer} = Layout;
    const user = null;
    if(!user){
        return(
            <>
                <Route path="/admin/login" component={AdminSignIn}/>
                <Redirect to="/admin/login"/>
            </>
        )
    }
    return(
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed}/>
            <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                <Header className="layout-admin__header">
                    <MenuTop
                        setMenuCollapsed={setMenuCollapsed}
                        menuCollapsed={menuCollapsed}/>
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer className="layout-admin__footer">
                    ... Footer
                </Footer>
            </Layout>
        </Layout>
    )
};

function LoadRoutes({routes}){
    return(
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    )

}