import { AppRootStateType } from 'store';

export const devicesSelector = (state: AppRootStateType) => state.profileSetting.devices;