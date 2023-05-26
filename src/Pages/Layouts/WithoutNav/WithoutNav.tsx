import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'common/components/Header/Header';

export const WithoutNav = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

