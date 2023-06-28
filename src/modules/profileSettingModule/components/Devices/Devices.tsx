import React from 'react';
import { Card } from 'common/components';
import { Device } from 'modules/profileSettingModule';

export const Devices = () => {
	return (
		<div>
			<Card title="This devices">
				<Device title="Chrome" ip="22.345.345.12" date="22.11.2022" />
			</Card>
		</div>
	);
};
