import React, { ReactNode } from 'react';
import { Title } from 'common/components';
import { ProfileSettingsNavigate } from 'modules/profileSettingModule';

type PropsType = {
	children: ReactNode;
};

export const ProfileSettings = ({ children }: PropsType) => {
	return (
		<div>
			<Title title="Profile settings" />
			<ProfileSettingsNavigate />
			{children}
		</div>
	);
};
