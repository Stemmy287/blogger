import { instance } from 'common/constans/instanceApi';
import { AxiosResponse } from 'axios';
import { LoginType, RegistrationDataType, TokensType, UserType } from './types';

export const apiAuth = {
	login(data: LoginType) {
		return instance.post<'', AxiosResponse<TokensType>, LoginType>('api/auth/login', data).then(res => res.data);
	},
	logout() {
		return instance.post('api/auth/logout');
	},
	auth() {
		return instance.get<UserType>('api/auth/me').then(res => res.data);
	},
	registration(data: RegistrationDataType) {
		return instance.post<'', AxiosResponse, RegistrationDataType>('api/auth/registration', data);
	},
};