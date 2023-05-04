import {instance} from "common/constans/instanceApi";
import {AxiosResponse} from "axios";

export const apiAuth = {
  login(data: LoginType) {
    return instance.post<'', AxiosResponse<TokensType>, LoginType>('api/auth/login', data)
      .then(res => res.data)
  },
  auth() {
    return instance.get<UserType>('api/auth/me')
      .then(res => res.data)
  },
  registration(data: RegistrationDataType) {
    return instance.post<'', AxiosResponse, RegistrationDataType>('api/auth/registration', data)
  }
}

//type
export type LoginType = {
  loginOrEmail: string
  password: string
}

export type UserType = {
  email: string
  login: string
  userId: string
}

type TokensType = {
  accessToken: string
  refresh: string
}

export type RegistrationDataType = {
  login: string
  password: string
  email: string
}