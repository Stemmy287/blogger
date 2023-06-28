import React from 'react';
import s from './Device.module.scss';

type PropsType = {
	title: string;
	ip: string;
	date: string;
};

export const Device = ({ title, ip, date }: PropsType) => {
	return (
		<div className={s.container}>
			<div className={s.content}>
				<span className={s.title}>{title}</span>
				<span className={s.ip}>IP: {ip}</span>
				<span className={s.date}>Last visit: {date}</span>
			</div>
		</div>
	);
};

