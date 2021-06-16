import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Input, Select, Avatar, Row, Col } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import "./EditUserForm.scss";
export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  });
useEffect(() => {
  if(avatar != null){
    setUserData({userData, "avatar": avatar})
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [avatar]);

  const updateUser = (e) =>{
    console.log(userData);
  }
  return(
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
};

function UploadAvatar(props){
  const { avatar, setAvatar } =props;
  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({file, preview: URL.createObjectURL(file)})
    },
    [setAvatar]
  );
  const {getRootProps, getInputProps, isDragActive}= useDropzone({
    accept: "image/jpg, image/png",
    noKeyboard: true,
    onDrop
  })
  return(
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()}/>
      {isDragActive ? (
        <Avatar src={NoAvatar} size={150}/>
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : NoAvatar}/>
      )}
    </div>
  );
};

function EditForm(props){
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;
  return(
    <Form className="form-edit" onFinish={updateUser} >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              type="text"
              defaultValue={userData.name}
              onChange={e => setUserData({...userData, name: e.target.value})}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
          <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              type="text"
              defaultValue={userData.lastname}
              onChange={e => setUserData({...userData, lastname: e.target.value})}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
          <Input
              prefix={<MailOutlined />}
              placeholder="Correo Electronico"
              type="text"
              defaultValue={userData.email}
              onChange={e => setUserData({...userData, email: e.target.value})}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
          <Select
            placeholder="Seleccionaun Rol de Usuario"
            defaultValue={userData.role}
            onChange={ e => setUserData({...userData, role: e})}>
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
          </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined/>}
              type="password"
              placeholder="Contraseña"
              onChange={e => setUserData({...userData, password: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={12}><Form.Item>
            <Input
              prefix={<LockOutlined/>}
              type="password"
              placeholder="Repetir Contraseña"
              onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
            />
          </Form.Item></Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit">Actualizar Usuario</Button>
      </Form.Item>
    </Form>
  )
}
