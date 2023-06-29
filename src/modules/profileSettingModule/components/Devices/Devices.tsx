import React, { useEffect } from 'react';
import s from './Devices.module.scss';
import { Button, Card } from 'common/components';
import { Device, fetchDevices } from 'modules/profileSettingModule';
import { useAppDispatch } from 'hooks';

export const Devices = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchDevices());
	}, [dispatch]);

	return (
		<div className={s.container}>
			<Card title="This devices">
				<Device title="Chrome" ip="22.345.345.12" date="22.11.2022" noLogout />
			</Card>
			<Button title="Terminate all other session" isNoBackGround />
			<div className={s.activeSessions}>
				<Card title="Active sessions">
					<Device title="Chrome" ip="22.345.345.12" date="22.11.2022" />
				</Card>
				<Card>
					<Device title="Chrome" ip="22.345.345.12" date="22.11.2022" />
				</Card>
				<Card>
					<Device title="Chrome" ip="22.345.345.12" date="22.11.2022" />
				</Card>
			</div>
		</div>
	);
};
