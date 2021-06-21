import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUpAdminApi } from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";
import "./AddUserForm.scss";
export default function AddUserForm(props) {
  const { setIsVisible, setReloadUsers } = props;
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    repeatPassword: ""
  });

  const addUser = () => {
    console.log(userData);
    if(!userData.name || !userData.lastname || !userData.email || !userData.role || !userData.password || !userData.repeatPassword){
      notification["error"]({
        message: "Todos los Campos son Obligatorios",
        placement: "bottomRight"
      });
    }else if(userData.password !== userData.repeatPassword){
      notification["error"]({
        message: "Las Contraseñas deben de ser Iguales",
        placement:"bottomRight"
      });
    }else{
      const accessToken = getAccessTokenApi();
      delete userData.repeatPassword;
      signUpAdminApi(accessToken, userData).then((response) => {
        notification["success"]({
          message: response,
          placement: "bottomRight"
        });
        setIsVisible(false);
        setReloadUsers(true);
        setUserData({
          name: "",
          lastname: "",
          email: "",
          role: "",
          password: "",
          repeatPassword: ""}
        );
      }).catch(err => {
        notification["error"]({
          message: err,
          placement: "bottomRight"
        })
      })
    }
  }
  return(
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
};

function AddForm(props){
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;
  return(
    <Form className="form-add" onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              value={userData.name}
              prefix={<UserOutlined/>}
              placeholder="Nombre"
              onChange={(e) => setUserData({...userData, name: e.target.value})}/>
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
          <Input
            type="text"
            prefix={<UserOutlined/>}
            value={userData.lastname}
            placeholder="Apellidos"
            onChange={(e) => setUserData({...userData, lastname: e.target.value})}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              prefix={<MailOutlined />}
              placeholder="Correo ELectronico"
              />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
          <Select
            placeholder="Tipo de Usuario"
            value={userData.role}
            onChange={(e) => setUserData({...userData, role: e})}>
            <Option value="admin">Administrador</Option>
            <Option value="reviwer">Revisor</Option>
            <Option value="editor">Editor</Option>
          </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}/>
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
          <Input
            type="password"
            placeholder="Repetir Contraseña"
            value={userData.repeatPassword}
            prefix={<LockOutlined/>}
            onChange={(e) => setUserData({...userData, repeatPassword: e.target.value})}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
      <Button htmlType="submit" type="primary">Agregar Usuario</Button>
      </Form.Item>
    </Form>
  );
}