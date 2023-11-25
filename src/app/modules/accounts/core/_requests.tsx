import axios from 'axios'

import {IUserDtoApiResponse} from "../../../pages/user-management/core/_models";
import {IChangePassword, IUpdateAccount} from "./_models";

const API_URL = process.env.REACT_APP_SECURITY_SERVICE_API_URL;

export const ACCOUNT_URL = `${API_URL}/account`;
export const ACCOUNT_PASSWORD_CHANGE_URL = `${ACCOUNT_URL}/change-password`


export function updateAccount(data: IUpdateAccount) {
    return axios.put<IUserDtoApiResponse>(ACCOUNT_URL, data);
}

export function changePassword(data: IChangePassword) {
    return axios.put<IUserDtoApiResponse>(ACCOUNT_PASSWORD_CHANGE_URL, data);
}