export interface IUpdateAccount {
    firstName?: string;
    lastName?: string;
}

export interface IChangePassword {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}