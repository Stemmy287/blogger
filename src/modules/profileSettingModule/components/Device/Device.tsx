import React from 'react';
import s from './Device.module.scss';
import { Logout } from 'common/components';


type PropsType = {
	title: string;
	ip: string;
	date: string;
	noLogout?: boolean;
};

export const Device = ({ title, ip, date, noLogout }: PropsType) => {
	return (
		<div className={s.container}>
			<div className={s.imgAndContent}>
				<div className={s.content}>
					<span className={s.title}>{title}</span>
					<span className={s.ip}>IP: {ip}</span>
					<span className={s.date}>Last visit: {date}</span>
				</div>
			</div>
			{!noLogout && <Logout callback={() => {}} />}
		</div>
	);
};
