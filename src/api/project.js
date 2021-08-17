import { BASE_PATH, API_VERSION } from "./config";

export function addProjectApi(token, project){
  const url = `${BASE_PATH}/${API_VERSION}/add-project`;
  const params = {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(project)
  };
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  })
};
export function deleteProjectApi(token, id){
  const url = `${BASE_PATH}/${API_VERSION}/delete-project/${id}`;
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
    return result;
  }).catch(err => {
    return err;
  })
};

export async function updateProjectApi(token, id, project){
  const url = `${BASE_PATH}/${API_VERSION}/update-project/${id}`;
  const params = {
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(project)
  };
  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err;
  }
}

export function getProjectsApi(limit, page){
  const url = `${BASE_PATH}/${API_VERSION}/get-projects?limit=${limit}&page=${page}`;
  return fetch(url).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  })
}; 
export function getProjectApi(id){
  const url = `${BASE_PATH}/${API_VERSION}/get-project/${id}`;
  return fetch(url).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  })
}