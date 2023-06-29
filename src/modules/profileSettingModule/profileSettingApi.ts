import { instance } from 'common/constans';
import { DeviceType } from 'modules/profileSettingModule';

export const profileSettingApi = {
	getDevices() {
		return instance.get<DeviceType[]>('api/security/devices').then(res => res.data)
	},
	deleteDevices() {
		return instance.delete('api/security/devices')
	},
	deleteDevice(deviceId: string) {
		return instance.delete(`api/security/devices/${deviceId}`)
	}
};
