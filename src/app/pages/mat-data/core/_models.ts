import {bool} from "yup";

export interface IApplicationDtoApiResponse {
    id: number;
    name: string;
    description: string;
    acceptedExtensions: string;
    url: string;
    active: boolean;
    templateId?: number;
}


export interface IUpsertApplication {
    id?: number;
    name: string;
    description?: string;
    acceptedExtensions: string;
    url: string;
    active?: boolean;
    templateId?: number;

}

export interface IFileDtoApiResponse {
    id: number;
    name: string;
    type: string;
    fileName: string;
}

export interface IInsertFile {
    id?: number;
    name: string;
    file?: any;

}
