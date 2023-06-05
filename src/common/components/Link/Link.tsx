import React, { FC, ReactNode } from 'react';
import s from './link.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
	to: string;
	title: string;
	icon: ReactNode;
};

export const Link: FC<Props> = ({ to, title, icon }) => {

	const {pathname, state} = useLocation()

	const active = (state?.title?.toLowerCase()[0] || pathname[1]) === title.toLowerCase()[0]

	return (
		<NavLink to={to} className={active ? `${s.navLink} ${s.active}` : s.navLink}>
			<div className={s.icon}>{icon}</div>
			<span>{title}</span>
		</NavLink>
	);
};
