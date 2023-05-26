import {AppRootStateType} from "store/store";

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized