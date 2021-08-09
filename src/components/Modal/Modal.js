import React from 'react';
import { Modal as ModalAnt } from "antd";
export default function Modal(props) {
  const { children, title, isVisible, setIsVisible, ...other } = props;
  return(
    <ModalAnt
      title={title}
      centered
      visible={isVisible}
      onCancel={()=> setIsVisible(false)}
      footer={[]}
      {...other}
    >
      {children}
    </ModalAnt>
  )
};
