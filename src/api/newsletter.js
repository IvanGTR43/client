import { BASE_PATH, API_VERSION } from "./config";
export function suscribeEmailApi(email){
  const url = `${BASE_PATH}/${API_VERSION}/suscribe-email/${email.toLowerCase()}`;
  const params = {
    method: "POST"
  }
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
};