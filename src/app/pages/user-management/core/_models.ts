import {date} from "yup";

export interface IUserDtoApiResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    status: UserStatus;
    userGroupId?: number;
}

export enum UserStatus{
    ACTIVE, WAITING_ACTIVATION, DEACTIVE
}

export interface ICreateUser {
    email?: string;
    passwordSettingType: number;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    userGroupId?: number;

}
export interface IUpdateUser {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    userGroupId?: number;
}

export enum PassworSettingTypes{
    CHOOSE_YOUR_OWN, SEND_EMAIL_RANDOM_PASSWORD
}


/**
 * mat-data tanimlari
 * */

export interface IUserGroupDtoApiResponse {
    id: number;
    name: string;
    endDate: number;
    applicationIds: number[];
    active: boolean;
}

export interface IUpsertUserGroupRequest {
    id?: number;
    name: string;
    endDate: any;
    lastName?: string;
    applicationIds: number[];
    active: boolean;
}