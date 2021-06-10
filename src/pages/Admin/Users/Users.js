import React, {useState, useEffect} from 'react';
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import "./Users.scss";
export default function Users(props) {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const token = getAccessTokenApi();
  useEffect(() => {
    getUsersApi(token).then(response => {
      setUsersActive(response);
    });
  }, [token]);
  return(
    <div className="users">
      <ListUsers/>
    </div>
  );
};
