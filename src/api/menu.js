import { BASE_PATH, API_VERSION } from "./config";

export function getMenuApi(){
  const url = `${BASE_PATH}/${API_VERSION}/get-menu`;
  return fetch(url).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err.message;
  });
};

export function updateMenuApi(token, id, menuData){
  const url = `${BASE_PATH}/${API_VERSION}/update-menu/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(menuData)
  };
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result.message;
  }).catch(err => {
    return err.message
  });
};

export function activeMenuApi(token, id, status){
  const url = `${BASE_PATH}/${API_VERSION}/activate-menu/${id}`;
  const params ={
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({active: status})
  };
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result.message;
  }).catch(err => {
    return err.message;
  });
};

export function addMenuApi(token, menuData){
  const url = `${BASE_PATH}/${API_VERSION}/add-menu`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(menuData)
  }
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result.message;
  }).catch(err  => {
    return err.message;
  });
};

export function deleteMenuApi(token, id){
  const url = `${BASE_PATH}/${API_VERSION}/delete-menu/${id}`;
  const params = {
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
  }).catch((err) => {
    console.log(err);
  });
};