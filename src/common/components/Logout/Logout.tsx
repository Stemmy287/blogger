import React from 'react';
import s from './Logout.module.scss';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';

type PropsType = {
	callback: () => void;
};

export const Logout = ({ callback }: PropsType) => {
	return (
		<div className={s.logout} onClick={callback}>
			<LogoutIcon />
			<span>login out</span>
		</div>
	);
};

