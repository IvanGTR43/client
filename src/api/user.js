import { BASE_PATH, API_VERSION } from "./config";

export async function signUpApi(data){
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json"
    }
  }
  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    if (result_1.user) {
      return {
        status: true,
        message: "Usuario Creado Correctamente"
      };
    }
    return {
      status: false,
      message: result_1.message
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}

export async function signInApi(data){
  const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
  const params ={
    method: "POST",
    body:JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (e) {
    return e.message;
  }
}

export async function getUsersApi(token){
  const url =`${BASE_PATH}/${API_VERSION}/users`;
  const params ={
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err.message;
  }
}
export async function getUsersActiveApi(token){
  const url =`${BASE_PATH}/${API_VERSION}/users-active?active=true`;
  const params ={
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err.message;
  }
};
export async function getUsersInactiveApi(token){
  const url =`${BASE_PATH}/${API_VERSION}/users-active?active=false`;
  const params ={
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err.message;
  }
}

export function uploadAvatarApi(token, avatar, userId){
  const url =`${BASE_PATH}/${API_VERSION}/upload-avatar/${userId}`;
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
  const params ={
    method: "PUT",
    body: formData,
    headers:{
      Authorization: token
    }
  };


  return fetch(url, params).then(response =>{
    return response.json();
  }).then(result =>{
    return result;
  }).catch(err =>{
    return err.message;
  }) ;
}

export function getAvatarApi(avatarName){
  const url =`${BASE_PATH}/${API_VERSION}/get-avatar/${avatarName}`;

  return fetch(url).then(response =>{
    return response.url;
  }).catch(err =>{
    return err.message;
  });
}

export async function updateUserApi(token, user, userId){
  const url = `${BASE_PATH}/${API_VERSION}/update-user/${userId}`;
  const params ={
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user)
  };

  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err.message;
  }
}

export function activateUserApi(token, userId, status){
  const url =`${BASE_PATH}/${API_VERSION}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      active: status
    })
  };
  return fetch(url, params).then(response =>{
    return response.json();
  }).then(result => {
    return result.message;
  }).catch(err => {
    return err.message;
  })

}

export function deleteUserApi(token, userId){
  const url = `${BASE_PATH}/${API_VERSION}/delete-user/${userId}`;
  const params={
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result.message;
  }).catch(err => {
    return err.message;
  })
};

export async function signUpAdminApi(token, data){
  const url = `${BASE_PATH}/${API_VERSION}/sign-up-admin/`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };
  return await fetch(url, params).then(response=> {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err.message
  })
};