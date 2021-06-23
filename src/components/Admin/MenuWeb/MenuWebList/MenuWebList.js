import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Modal as ModalWL, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi, activeMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import Modal from "../../../Modal";

import "./MenuWebList.scss";
const { confirm } = ModalWL;
export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

   //let dataMenu = Array.from(menu);
  useEffect(() => {
    const listItemsArray = [];
    menu.forEach((item)=> {
      listItemsArray.push({
        content: (<MenuItem item={item} activateMenu={activateMenu}/>)
      });
    });
    setListItems(listItemsArray);
  }, [menu]);

  const activateMenu = (menu, status) => {
    const token = getAccessTokenApi();
    activeMenuApi(token, menu._id, status).then(result => {
      notification["success"]({
        message: result,
        placement: "bottomRight"
      })
    }).catch(err => {
      notification["error"]({
        message: err,
        placement: "bottomRight"
      })
    })
  }

  const onSort = (sortedList, dropEvent) => {
    const token = getAccessTokenApi();
    console.log(listItems);
    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(token, _id, { order })
    });
    //updateMenuApi(token, id, data)
  }
  return(
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary">Menu</Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
      </div>
    </div>
  );
};

function MenuItem(props){
  const { item, activateMenu } = props;
  return(
    <List.Item
      actions={[
        <Switch defaultChecked={item.active} onClick={(e) => activateMenu(item, e)}/>,
        <Button type="primary"><EditOutlined /></Button>,
        <Button type="danger"><DeleteOutlined /></Button>
      ]}>
      <List.Item.Meta title={item.title} description={item.url}/>
    </List.Item>
  );
}
