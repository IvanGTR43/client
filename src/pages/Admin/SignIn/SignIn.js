import React from "react";
import { Layout, Tabs } from "antd";
import { getAccessTokenApi } from "../../../api/auth";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/png/logo-ivan.png";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import "./SignIn.scss";
// import RegisterForm from "../../../components/Admin/RegisterForm";
export default function SignIn(){
  const { Content } = Layout;
   const { TabPane } = Tabs;
   if(getAccessTokenApi()){
       return <Redirect to="/admin"/>
   }
   return(
    <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="Ivan Gabriel Tacuapan Reyes"/>
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm/>
                        </TabPane>
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2">
                            <RegisterForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}