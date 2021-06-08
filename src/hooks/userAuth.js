import React, { useContext } from 'react'
import { authContext } from "../providers/AuthProviders";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  useContext(authContext);
};
