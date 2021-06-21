import React, {useState, useEffect} from 'react';
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersInactiveApi, getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import "./Users.scss";
export default function Users(props) {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();
  useEffect(() => {
    getUsersActiveApi(token).then(response => {
      setUsersActive(response.users);
    });
    getUsersInactiveApi(token).then(response =>{
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);
  return(
    <div className="users">
      <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers}/>
    </div>
  );
};
