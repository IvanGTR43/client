import React, { useState } from 'react';
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { suscribeEmailApi } from "../../../api/newsletter";
import "./NewsLetter.scss";
export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const onFinish = () => {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const resultValidation = emailValid.test(email);
    console.log(resultValidation);
    if(!resultValidation){
      notification["warning"]({
        message: "Email no Valido",
        placement: "bottomRight"
      })
    }else{
      suscribeEmailApi(email).then(result => {
        if(result.code === 200){
          notification["success"]({
            message: result.message,
            placement: "bottomRight"
          });
          setEmail("");
        }else{
          notification["error"]({
            message: result.message,
            placement: "bottomRight"
          });
        }
      })
    }
  }
  return (
    <div className="news-letter">
      <h3>NewsLetter</h3>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
            placeholder="Correo Electronico"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
           className="login-form-button">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
