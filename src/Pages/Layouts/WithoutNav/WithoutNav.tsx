import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'common/components/Header/Header';
import s from './WithoutNav.module.scss';

export const WithoutNav = () => {
	return (
		<div className={s.container}>
			<Header />
			<div className={s.content}>
				<Outlet />
			</div>
		</div>
	);
};
