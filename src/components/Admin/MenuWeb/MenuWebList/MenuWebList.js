import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Modal as ModalWL, notification } from "antd";
import {} from "@ant-design/icons";
import DragSortableList from 'react-drag-sortable'
import Modal from "../../../Modal";

import "./MenuWebList.scss";
const { confirm } = ModalWL;
export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState({});
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  let dataMenu =Array.from(menu);

  useEffect(() => {
    const listItemsArray = [];
    dataMenu.forEach((item)=> {
      listItemsArray.push({
        content: (<div><p>i{item.title}</p></div>)
      })
    });
    setListItems(listItemsArray);
  }, [dataMenu, listItems]);
  const onSort = (sortedList, dropEvent) => {
    console.log("On Sort");
  }
  return(
    <div className="menu-web-list">
      <div className="menu-m¿web-list__header">
        <Button type="primary">Menu</Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
      </div>
    </div>
  );
};
