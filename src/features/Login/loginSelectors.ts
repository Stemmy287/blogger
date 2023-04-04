import {AppRootStateType} from "app/store";

export const isLoggedInSelector = (state: AppRootStateType) => state.login.isLoggedIn