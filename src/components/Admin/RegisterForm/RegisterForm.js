import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./RegisterForm.scss";
import { emailValidation, minLengthValidation } from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email:"",
    password: "",
    repeatPassword: "",
    privacyPolicy: false
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false
  });
  const changeForm = (e) =>{
    if(e.target.name === "privacyPolicy"){
      setInputs({...inputs, [e.target.name]: e.target.checked});
    }else{
      setInputs({...inputs, [e.target.name]: e.target.value});
    }
  };

  const inputValidation = (e) =>{
    const { type, name } = e.target;
    if(type === "email"){
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target)
      })
    }else if(type === "password"){
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6)
      })
    }else if(type === "checkbox"){
      setFormValid({
        ...formValid,
        [name]: e.target.checked
      })
    }
  }

  const register = async() =>{
    const passwordVal = inputs.password;
    const repeatP = inputs.repeatPassword;

    if(!inputs.email || !passwordVal || !repeatP || !inputs.privacyPolicy){
      notification["error"]({
        message: "Todos los Campos son Obligatorios",
        placement: 'bottomRigth'
      });
    }else{
      if(passwordVal !== repeatP){
        notification["error"]({
          message: "Las Contraseñas deben de ser Iguales",
          placement: "bottomRight"
        });
      }
      else{
        const result = await signUpApi(inputs);
        if(!result.status){
          notification["error"]({
            message: result.message
          });
        }else{
          notification["success"]({
            message: result.message
          });
          resetForm();
        }
      }
    }
  }

  const resetForm = () =>{
    const input = document.getElementsByTagName('input');

    for(let i = 0; i < input.length; i++){
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }
    setInputs({
      email:"",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
    });
    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    })
  }
  return (
    <Form className="register-form" onChange={changeForm} onFinish={register}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
          placeholder="Cosntraseña"
          type="password"
          name="password"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
          />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
          placeholder="Repetir Contraseña"
          type="password"
          name="repeatPassword"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
          >
          He Leido y Acepto las Politicas de Privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form__button">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
    )
};

