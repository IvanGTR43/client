import React,{ useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalConfirm} from "antd";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckCircleOutlined , ExclamationCircleOutlined} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../../Users/AddUserForm";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import "./ListUsers.scss";
const { confirm } = ModalConfirm;
export default function ListUsers(props) {
  const {usersActive, usersInactive, setReloadUsers} = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const  addUserModal = () => {
    setIsVisible(true);
    setModalTitle("Crear Nuevo Usuario");
    setModalContent(
      <AddUserForm
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  }

  return(
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked={true}
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
          <span>
            {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button
          type="primary"
          onClick={addUserModal}
        >
          Nuevo Usuario
        </Button>
      </div>
      {viewUsersActive ?
        <UsersAvtive
          usersActive={usersActive}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
          :
        <UsersInavtive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      }
        <Modal
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          title={modalTitle}
        >
          {modalContent}
        </Modal>
    </div>
  );
};

function UsersAvtive(props){
  const { usersActive, setIsVisible, setModalTitle, setModalContent, setReloadUsers } = props;
  const editUser = (user) => {
    setIsVisible(true);
    setModalTitle(`Editar ${user.name ? user.name + " " + user.lastname: user.email}`);
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  }
  return(
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={ user => <UseActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
    />
  )
}
function UseActive(props){
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then( response =>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
  }, [user]);
  const desactivateUser = () => {
    const token = getAccessTokenApi();
    activateUserApi(token, user._id, false).then(response => {
      notification["success"]({
        message: response,
        placement: "bottomRight"
      });
      setReloadUsers(true);
    }).catch((err) => {
      notification["error"]({
        message: err,
        placement: "bottomRight"
      });
    });
  };
  const showDeleteConfirm = () => {
    const token = getAccessTokenApi();
    confirm({
      title: `Eliminar ${user.name ? user.name : user.email}`,
      icon: <ExclamationCircleOutlined />,
      content: `Estas seguro que quieres eliminar al usuario ${user.name ? user.name+ " " + user.lastname : user.email} `,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk(){
        const id = user._id;
        deleteUserApi(token, id).then(response => {
          notification["success"]({
            message: response,
            placement: "bottomRight"
          });
          setReloadUsers(true);
        }).catch(err => {
          notification["error"]({
            message: err,
            placement: "bottomRight"
          });
        })
      }
    });
  }
  return(
    <List.Item
      actions={[
        <Button type="primary" onClick={()=> editUser(user)}>
         <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>
      ]}>
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
        title={`${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`}
        description={user.email}
      />
    </List.Item>
  );
};

function UsersInavtive(props){
  const { usersInactive, setReloadUsers } = props;
  return(
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={ user => <UseInactive user={user} setReloadUsers={setReloadUsers}/>}
    />
  )
};

function UseInactive(props){
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then( response =>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
  }, [user]);
  const activateUser = () => {
    const token = getAccessTokenApi();
    activateUserApi(token, user._id, true).then(response => {
      notification["success"]({
        message: response,
        placement: "bottomRight"
      });
      setReloadUsers(true);
    }).catch((err) => {
      notification["error"]({
        message: err,
        placement: "bottomRight"
      });
    });
  };
  const showDeleteConfirm = () => {
    const token = getAccessTokenApi();
    confirm({
      title: `Eliminar ${user.name ? user.name : user.email}`,
      icon: <ExclamationCircleOutlined />,
      content: `Estas seguro que quieres eliminar al usuario ${user.name ? user.name+ " " + user.lastname : user.email} `,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk(){
        const id = user._id;
        deleteUserApi(token, id).then(response => {
          notification["success"]({
            message: response,
            placement: "bottomRight"
          });
          setReloadUsers(true);
        }).catch(err => {
          notification["error"]({
            message: err,
            placement: "bottomRight"
          });
        })
      }
    });
  }
  return(
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckCircleOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>
      ]}>
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
        title={`${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`}
        description={user.email}
      />
  </List.Item>
  );
}