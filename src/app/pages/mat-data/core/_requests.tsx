import axios from 'axios'
import {IApplicationDtoApiResponse, IFileDtoApiResponse, IInsertFile, IUpsertApplication} from "./_models";

const API_URL = process.env.REACT_APP_SECURITY_SERVICE_API_URL;

export const APPLICAION_URL = `${API_URL}/application`;
export const FILE_URL = `${API_URL}/file`;
export const ACCOUNT_APPLICAION_URL = APPLICAION_URL + "/account-apps";
export const APPLICAION_PROCESS_URL = APPLICAION_URL + "/process";
export const APPLICATION_LIST_URL = `${APPLICAION_URL}?page=0&size=5&sort=id&direction=ASC`
export const FILE_LIST_URL = `${FILE_URL}?page=0&size=5&sort=id&direction=ASC`


export function getAccountApplications() {
    return axios.get<IApplicationDtoApiResponse[]>(ACCOUNT_APPLICAION_URL);
}

export function getApplications() {
    return axios.get<IApplicationDtoApiResponse[]>(APPLICATION_LIST_URL);
}

export function createApplication(app: IUpsertApplication) {
    return axios.post<IApplicationDtoApiResponse>(APPLICAION_URL, app);
}

export function updateApplication(app: IUpsertApplication) {
    return axios.put<IApplicationDtoApiResponse>(APPLICAION_URL, app);
}

export function getApplicationById(applicationId: any) {
    return axios.get<IApplicationDtoApiResponse>(APPLICAION_URL + "/" + applicationId);
}

export function deleteApplicationById(applicationId: any) {

    return axios.delete<void>(APPLICAION_URL + "/" + applicationId);
}

export function processApp(file: any, applicationId: number) {
    let formData = new FormData();
    formData.append("file", file);

    return axios.post<any>(APPLICAION_PROCESS_URL + "/" + applicationId, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },responseType: 'blob'
    });
}

export function getFiles() {
    return axios.get<IFileDtoApiResponse[]>(FILE_LIST_URL);
}

export function getFileById(id: any) {
    return axios.get<IFileDtoApiResponse>(FILE_URL + "/" + id);
}

export function createFile(file: IInsertFile) {
    var bodyFormData = new FormData();
    bodyFormData.append("name",file.name);
    bodyFormData.append("file",file.file);
    return axios.post<IFileDtoApiResponse>(FILE_URL, bodyFormData);
}

export function updateFile(file: IInsertFile) {
    return axios.put<IFileDtoApiResponse>(FILE_URL, {
        id: file.id,
        name: file.name
    });
}
export function deleteFileById(id: any) {

    return axios.delete<void>(FILE_URL + "/" + id);
}
