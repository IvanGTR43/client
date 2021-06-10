import React, {useState, useEffect} from 'react';
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi } from "../../../api/user";
import "./Users.scss";
export default function Users(props) {
  const [users, setUsers] = useState([]);
  const token = getAccessTokenApi();
  useEffect(() => {
    getUsersApi(token).then(response => {
      setUsers(response);
    });
  }, [token]);
  return(
    <div>
      <h1>Lista de Usuarios</h1>
    </div>
  );
};