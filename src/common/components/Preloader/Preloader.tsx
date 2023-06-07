import React from 'react';
import { ReactComponent as Spinner } from 'assets/icons/preloader.svg';
import s from './Preloader.module.scss';

export const Preloader = () => {
	return (
		<div className={s.container}>
			<Spinner className={s.preloader} />
		</div>
	);
};
