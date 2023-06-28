import React, { ReactNode } from 'react';
import s from './BurgerMenuButton.module.scss';

type PropsType = {
	title: string;
	callback: () => void;
	icon?: ReactNode;
};

export const BurgerMenuButton = ({ title, callback, icon }: PropsType) => {
	return (
		<button className={s.button} onClick={callback}>
			<span>{title}</span>
			{icon}
		</button>
	);
};
