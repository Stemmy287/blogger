import React from 'react';
import s from './BackLink.module.scss';
import arrow from 'assets/icons/arrowBackLink.svg';
import { NavLink } from 'react-router-dom';

type PropsType = {
	link: string;
	to: string;
};

export const BackLink = ({ link, to }: PropsType) => {
	return (
		<NavLink to={link} className={s.backLink}>
			<img src={arrow} alt={'arrow'} />
			Back to {to}
		</NavLink>
	);
};
