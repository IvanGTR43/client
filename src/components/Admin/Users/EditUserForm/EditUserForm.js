import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Input, Select, Avatar, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";

import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { getAvatarApi, uploadAvatarApi, updateUserApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisible, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
//actualizar el userData cada que el usuario cambie
useEffect(() => {
  setUserData({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  })
}, [user]);

useEffect(() => {
  if(user.avatar){
    getAvatarApi(user.avatar).then(response =>{
      setAvatar(response);
    });
  }else{
    setAvatar(null);
  }
}, [user]);

useEffect(() => {
  if(avatar != null){
    setUserData({userData, avatar: avatar.file});
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [avatar]);

  const updateUser = () => {
    const token = getAccessTokenApi();
    var userUpdate = userData;
    if(userUpdate.password || userUpdate.repeatPassword){
      if(userUpdate.password !== userUpdate.repeatPassword){
        notification["error"]({
          message: "Las contraseñas tienen que ser Iguales",
          placement: "bottomRight"
        });
        return;
      }else{
        delete userUpdate.repeatPassword;
        console.log(userUpdate);
      }
    }
    if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
      notification["error"]({
        message: "Nombre, Apellidos y Email son Obligatorios",
        placement: "bottomRight"
      });
      return;
    }
    if(typeof userUpdate.avatar === "object"){
      uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then(result =>{
          console.log(userUpdate);
          notification["success"]({
            message: result.message,
            placement: "bottomRight"
          });
          setIsVisible(false);
          setReloadUsers(true);
        });
      })
    }else{
      console.log("nuevo " + userUpdate);
      delete userUpdate.avatar;
      updateUserApi(token, userUpdate, user._id).then(result =>{
        notification["success"]({
          message: result.message,
          placement: "bottomRight"
        });
        setIsVisible(false);
        setReloadUsers(true);
      });
    }
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
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if(avatar){
      if(avatar.preview){
        setAvatarUrl(avatar.preview);
      }else{
        setAvatarUrl(avatar);
      }
    }else{
      setAvatarUrl(null);
    }
  }, [avatar]);

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
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar}/>
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
              value={userData.name}
              onChange={e => setUserData({...userData, name: e.target.value})}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
          <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              type="text"
              value={userData.lastname}
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
              value={userData.email}
              onChange={e => setUserData({...userData, email: e.target.value})}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
          <Select
            placeholder="Seleccionaun Rol de Usuario"
            value={userData.role}
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
