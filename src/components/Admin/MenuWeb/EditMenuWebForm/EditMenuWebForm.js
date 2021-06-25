import React, {useState, useEffect} from 'react';
import { Button, Input, Form, notification } from "antd";
import { FontSizeOutlined, GlobalOutlined } from "@ant-design/icons";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditMenuWebForm.scss";
export default function EditMenuWebForm(props) {
  const { setisVisibleModal, setReloadMenuWeb, menu } = props;
  const [menuWebData, setMenuWebData] = useState(menu);
  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);
  const editMenu = () => {
    if(!menuWebData.title ||!menuWebData.url){
      notification["error"]({
        message: "Todos los campos son Obligatorios",
        placement: "bottomRight"
      });
    }else{
      const token = getAccessTokenApi();
      updateMenuApi(token, menuWebData._id, menuWebData).then( response => {
        notification["success"]({message: response, placement: "bottomRight"});
        setisVisibleModal(false);
        setReloadMenuWeb(true);
      }).catch((err) => {
        console.log(err);
        notification["error"]({message: "Error en el Servidor, intentelo Mas Tarde", placement: "bottomRight"});
      });
    }
  }
  return(
    <div className="edit-menu-web-form">
      <EditForm
        setMenuWebData={setMenuWebData}
        menuWebData={menuWebData}
        editMenu={editMenu}
        menu={menu}
      />
    </div>
  );
};

function EditForm(props){
  const { menuWebData, setMenuWebData, editMenu, menu } = props;
  return(
    <Form className="form-edit" onFinish={editMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Title"
          value={menuWebData.title}
          onChange={ e => setMenuWebData({...menuWebData, title: e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GlobalOutlined />}
          placeholder="Url"
          value={menuWebData.url}
          onChange={e => setMenuWebData({...menuWebData, url: e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="btn-submit">
            Actualizar Menu
        </Button>
      </Form.Item>
    </Form>
  );
}
