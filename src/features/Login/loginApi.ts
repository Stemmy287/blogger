import {instance} from "common/constans/instanceApi";
import {AxiosResponse} from "axios";

export const apiLogin = {
  login(data: LoginType) {
    return instance.post<'', AxiosResponse<{ accessToken: string }>, LoginType>('api/auth/login', data)
      .then(res => res.data)
  },
  auth() {
    return instance.get<UserType>('api/auth/me')
      .then(res => res.data)
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