import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from 'common/components/NavBar/NavBar';
import s from './WithNav.module.scss';
import { Header } from 'common/components/Header/Header';
import { PATH } from '../../../common/constans/path';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { isLoggedInSelector } from '../../../modules/authModule/authSelectors';

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

