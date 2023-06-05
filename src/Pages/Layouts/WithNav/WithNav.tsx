import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from 'common/components';
import s from './WithNav.module.scss';
import { Header } from 'common/components';
import { PATH } from 'common/constans';
import { useAppSelector } from 'hooks';
import { isLoggedInSelector } from 'modules/authModule';

export const WithNav = () => {
	const isLoggedIn = useAppSelector(isLoggedInSelector);

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN} />;
	}

	return (
		<div className={s.container}>
			<Header />
			<div className={s.NavAndContent}>
				<NavBar />
				<div className={s.mainContent}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

