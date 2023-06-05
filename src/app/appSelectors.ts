import { AppRootStateType } from 'store';

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized;