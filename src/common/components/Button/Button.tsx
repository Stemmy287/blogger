import React from 'react';
import s from './Button.module.scss';

type PropsType = {
	callback?: () => void;
	title: string;
	type?: 'button' | 'submit' | 'reset';
	isNoBackGround?: boolean;
	disabled?: boolean;
};

export const Button = ({ callback, title, type, isNoBackGround, disabled }: PropsType) => {
	return (
			<button
				type={type || 'button'}
				className={isNoBackGround ? `${s.button} ${s.noBackground}` : s.button}
				onClick={callback}
				disabled={disabled}
			>
				{title}
			</button>
	);
};

