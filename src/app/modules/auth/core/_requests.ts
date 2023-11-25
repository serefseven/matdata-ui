import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_SECURITY_SERVICE_API_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/account`
export const LOGIN_URL = `${API_URL}/oauth2/token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/public/password-reset`
export const CHECK_PASSWORD_RESET_URL = `${API_URL}/public/check-password-reset-token`
export const SET_PASSWORD_URL = `${API_URL}/public/set-password`

// Server should return AuthModel
export function login(email: string, password: string) {
  const basicAuth = btoa(CLIENT_ID+':'+CLIENT_SECRET);
  const headers = {
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

export function requestPassword(username: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    username,
  })
}

export function checkResetPassword(email: string | undefined, token: string | undefined) {
  return axios.post<{result: boolean}>(CHECK_PASSWORD_RESET_URL, {
    email,
    token
  })
}
export function setPassword(email: string | undefined,
                            token: string | undefined,
                            password: string,
                            confirmPassword: string) {
  return axios.post<{result: boolean}>(SET_PASSWORD_URL, {
    email,
    token,
    password,
    confirmPassword
  })
}

export function getUserByToken(auth: AuthModel) {
  const headers = {
    'Authorization': auth.token_type + ' ' + auth.access_token
  }
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    headers: headers
  })
}
