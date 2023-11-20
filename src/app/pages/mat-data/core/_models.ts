import {bool} from "yup";

export interface IApplicationDtoApiResponse {
    id: number;
    name: string;
    description: string;
    acceptedExtensions: string;
    url: string;
    active: boolean;
}


export interface IUpsertApplication {
    id?: number;
    name: string;
    description?: string;
    acceptedExtensions: string;
    url: string;
    active?: boolean;

}