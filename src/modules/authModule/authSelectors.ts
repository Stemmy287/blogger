import { AppRootStateType } from 'store';

export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
export const userSelector = (state: AppRootStateType) => state.auth.user;