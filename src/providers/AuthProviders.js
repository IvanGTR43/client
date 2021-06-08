import React, {useState, useEffect, createContext} from 'react';
import { getAccessTokenApi, getRefreshTokenApi, refereshAccessToken, logOut } from "../api/auth";

export const authContext = createContext();
export default function AuthProviders(props) {
  console.log(props);
};
