import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_SECURITY_SERVICE_API_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/account`
export const LOGIN_URL = `${API_URL}/oauth2/token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/public/password-reset`

// Server should return AuthModel
export function login(email: string, password: string) {
  const basicAuth = btoa(CLIENT_ID+':'+CLIENT_SECRET);
  const headers = {
    'X-Tenant-ID': 'dev',
    'Authorization': 'Basic '+basicAuth
  }
  var bodyFormData = new FormData();
  bodyFormData.append("grant_type","password");
  bodyFormData.append("username",email);
  bodyFormData.append("password",password);

  return axios.post<AuthModel>(LOGIN_URL, bodyFormData,{
    headers: headers
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(auth: AuthModel) {
  const headers = {
    'X-Tenant-ID': 'dev',
    'Authorization': auth.token_type + ' ' + auth.access_token
  }
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    headers: headers
  })
}
