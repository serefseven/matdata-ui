import axios from 'axios'
import {
    ICreateUser,
    IUpdateUser,
    IUpsertUserGroupRequest,
    IUserDtoApiResponse,
    IUserGroupDtoApiResponse
} from "./_models";
const API_URL = process.env.REACT_APP_SECURITY_SERVICE_API_URL;

export const USER_URL = `${API_URL}/user`;
export const USER_LIST_URL = `${USER_URL}?page=0&size=5&sort=id&direction=ASC`


export function getUsers() {
    return axios.get<IUserDtoApiResponse[]>(USER_LIST_URL);
}
export function createUser(user:ICreateUser) {
    return axios.post<IUserDtoApiResponse>(USER_URL, user);
}
export function updateUser(user:IUpdateUser) {
    return axios.put<IUserDtoApiResponse>(USER_URL, user);
}
export function getUserById(userId: any) {
    return axios.get<IUserDtoApiResponse>(USER_URL+"/"+userId);
}
export function deleteUserById(userId: any) {
    return axios.delete<void>(USER_URL+"/"+userId);
}

/**
 * mat-data metodları
 * */

export const USERGROUP_URL = `${API_URL}/usergroup`;

export function getUserGroups() {
    return axios.get<IUserGroupDtoApiResponse[]>(USERGROUP_URL);
}
export function createUserGroup(userGroup:IUpsertUserGroupRequest) {
    return axios.post<IUserGroupDtoApiResponse>(USERGROUP_URL, userGroup);
}
export function updateUserGroup(userGroup:IUpsertUserGroupRequest) {
    return axios.put<IUserGroupDtoApiResponse>(USERGROUP_URL, userGroup);
}
export function getUserGroupById(userGrupId: any) {
    return axios.get<IUserGroupDtoApiResponse>(USERGROUP_URL+"/"+userGrupId);
}
export function deleteUserGroupById(userGrupId: any) {
    return axios.delete<void>(USERGROUP_URL+"/"+userGrupId);
}