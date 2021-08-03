import { BASE_PATH, API_VERSION } from "./config";
export function getCoursesApi(){
  const url = `${BASE_PATH}/${API_VERSION}/get-course`;
  return fetch(url).then(response => {
    return response.json();
  }).then(response => {
    return response
  }).catch(err => {
    return err;
  })
}


export function getCourseDataUdemyApi(id){
  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}/?fields[course]=title,headline,url,price,image_480x270`;
  return fetch(baseUrl).then(async response => {
    return {code: response.status, data: await response.json()};
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
};

export function deleteCourseApi(token, id){
  const url = `${BASE_PATH}/${API_VERSION}/delete-course/${id}`;
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
}
export function addCourseApi(token, course){
  const url = `${BASE_PATH}/${API_VERSION}/add-course`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(course)
  };
  return fetch(url, params).then(response => {
    return response.json()
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
}

export function updateCourseApi(token, course, id){
  const url = `${BASE_PATH}/${API_VERSION}/update-course/${id}`;
  const params ={
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(course)
  };

  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  })
}