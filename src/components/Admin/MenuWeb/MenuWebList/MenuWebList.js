import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Modal as ModalWL, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi, activeMenuApi, deleteMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";
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
        content: (<MenuItem item={item} activateMenu={activateMenu} editMenuWeb={editMenuWeb} deleteMenu={deleteMenu}/>)
      });
    });
    setListItems(listItemsArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const addMenuWebModal = () => {
    setisVisibleModal(true);
    setModalTitle("Agregar Menu");
    setModalContent(
      <AddMenuWebForm
        setisVisibleModal={setisVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };
  const editMenuWeb = (menu) => {
    setisVisibleModal(true);
    setModalTitle(`Editando Menu: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setisVisibleModal={setisVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menu={menu}/>
    );
  }
  const deleteMenu = (menu) => {
    
    // TO DO: modal confirm
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminar Menu",
      content: `¿Estas seguo que quieres eliminar el menu: ${menu.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => {
        deleteMenuApi(token, menu._id).then(response => {
          notification["success"]({
            message: response,
            placement: "bottomRight"
          });
          setReloadMenuWeb(true);
        }).catch(()=>{
          notification["error"]({
            message: "Error del Servidor, Intentelo mas tarde",
            placement: "bottomRight"
          });
        })
      }
    });

  }
  return(
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>Crear Menú</Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
      </div>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setisVisibleModal}
        children={modalContent}
        />
    </div>
  );
};

function MenuItem(props){
  const { item, activateMenu, editMenuWeb, deleteMenu } = props;
  return(
    <List.Item
      actions={[
        <Switch defaultChecked={item.active} onClick={(e) => activateMenu(item, e)}/>,
        <Button type="primary" onClick={() => editMenuWeb(item)}><EditOutlined /></Button>,
        <Button type="danger" onClick={()=> deleteMenu(item)}><DeleteOutlined /></Button>
      ]}>
      <List.Item.Meta title={item.title} description={item.url}/>
    </List.Item>
  );
}
