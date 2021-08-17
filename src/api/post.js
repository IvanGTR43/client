import { result } from "lodash";
import { BASE_PATH, API_VERSION } from "./config";

export async function getPostsApi(limit, page){
  const url =`${BASE_PATH}/${API_VERSION}/get-posts?limit=${limit}&page=${page}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err;
  }
}

export function deletePostApi(token, id){
  const url = `${BASE_PATH}/${API_VERSION}/delete-post/${id}`;
  const params = {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    }
  }
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch((err)=> {
    return err;
  })
};
export function addPostApi(token, post){
  const url = `${BASE_PATH}/${API_VERSION}/add-post`;
  const params={
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post)
    }
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
};

export function updatePostApi(token, id, post){
  const url = `${BASE_PATH}/${API_VERSION}/update-post/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post)
  }
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
};

export function getPostApi(urlPost){
  const url = `${BASE_PATH}/${API_VERSION}/get-post/${urlPost}`;
  return fetch(url).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
}