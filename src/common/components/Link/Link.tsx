import React, { ReactNode } from 'react';
import s from './Link.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

type PropsType = {
	to: string;
	title: string;
	icon: ReactNode;
};

export const Link = ({ to, title, icon }: PropsType) => {

	const {pathname, state} = useLocation()

	const active = (state?.title?.toLowerCase()[0] || pathname[1]) === title.toLowerCase()[0]

	return (
		<NavLink to={to} className={active ? `${s.navLink} ${s.active}` : s.navLink}>
			<div className={s.icon}>{icon}</div>
			<span>{title}</span>
		</NavLink>
	);
};
