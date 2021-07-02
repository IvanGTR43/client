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

export function addCourseApi(){
  const url = `${BASE_PATH}/${API_VERSION}/add-course`;
  
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