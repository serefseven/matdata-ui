export interface AuthModel {
  access_token: string
  refresh_token?: string
  expires_in?: string
  token_type?: string
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  type: number
  firstName: string
  lastName: string
  fullname?: string
  userGroupName?: string
  language?: 'en' | 'tr'
  timeZone?: string
  auth?: AuthModel
}

export interface IPasswordResetModel {
  password: string;
  confirmPassword: string;
}
