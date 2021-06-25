import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from "antd";
import "./AddMenuWebForm.scss";
import { FontSizeOutlined } from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
export default function AddMenuWebForm(props) {
const { setisVisibleModal, setReloadMenuWeb } = props;
const [menuWebData, setMenuWebData] = useState({});

const addMenu = () => {
  let finalData = {
    title: menuWebData.title,
    url: menuWebData.http + menuWebData.url
  };
  if(!finalData.title || !finalData.url){
    notification["error"]({
      message: "Todos los Campos Son Obligatorios",
      placement: "bottomRight"
    });
  }else{
    const token = getAccessTokenApi();
    finalData.active = false;
    finalData.order = 1000;
    addMenuApi(token, finalData).then(response => {
      notification["success"]({
        message: response,
        placement: "bottomRight"
      });
      setisVisibleModal(false);
      setReloadMenuWeb(true);
      setMenuWebData({});
      finalData = {};
    }).catch(() => {
      notification["error"]({
        message: "Error en el servidor",
        placement: "bottomRight"
      });
    });
  }

};
  return(
    <div className="add-menu-web-form">
      <AddForm
        addMenu={addMenu}
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
      />
    </div>
  );
};

function AddForm(props){
  const { addMenu, menuWebData, setMenuWebData } = props;
  const { Option } = Select;
  const selectBefore =(
    <Select
      defaultValue="http://"
      style={{width: 90}}
      onChange={e => setMenuWebData({...menuWebData, http: e})}
    >
      <Option value="http://" defaultValue>http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return(
    <Form className="form-add" onFinish={addMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Título"
          value={menuWebData.title}
          onChange={ e => setMenuWebData({...menuWebData, title: e.target.value})}
          required
        />
      </Form.Item>
      <Form.Item>
        <Input
        addonBefore={selectBefore}
          placeholder="Url"
          value={menuWebData.url}
          onChange={ e => setMenuWebData({...menuWebData, url: e.target.value})}
          required
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Agregar Menu</Button>
      </Form.Item>
    </Form>
  );
}