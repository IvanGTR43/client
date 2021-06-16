import React,{useState} from 'react';
import { Switch, List, Avatar, Button } from "antd";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import "./ListUsers.scss";
export default function ListUsers(props) {
  const {usersActive, usersInactive} = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return(
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked={true}
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>
      {viewUsersActive ?
        <UsersAvtive
          usersActive={usersActive}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
          :
        <UsersInavtive
          usersInactive={usersInactive}
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
  const { usersActive, isVisible, setIsVisible, setModalTitle, setModalContent } = props;
  const editUser = (user) => {
    setIsVisible(true);
    setModalTitle(`Editar ${user.name ? user.name + " " + user.lastname: user.email}`);
    setModalContent(<EditUserForm user={user}/>);
  }
  return(
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={ user => (
        <List.Item
          actions={[
            <Button type="primary" onClick={()=> editUser(user)}>
              <EditOutlined />
            </Button>,
            <Button type="danger" onClick={()=> console.log("Desactivar Usuario")}>
              <StopOutlined />
            </Button>,
            <Button type="danger" onClick={()=> console.log("Eliminar Usuario")}>
              <DeleteOutlined />
            </Button>
          ]}>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}/>}
            title={`${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  )
}

function UsersInavtive(props){
  const { usersInactive } = props;
  return(
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={ user => (
        <List.Item
          actions={[
            <Button type="primary" onClick={()=> console.log("Activar Usuario")}>
              <CheckCircleOutlined />
            </Button>,
            <Button type="danger" onClick={()=> console.log("Eliminar Usuario")}>
              <DeleteOutlined />
            </Button>
          ]}>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}/>}
            title={`${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  )
}