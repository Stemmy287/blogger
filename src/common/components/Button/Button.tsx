import React, { FC } from 'react';
import s from './button.module.scss';

type ButtonPropsType = {
	callback?: () => void;
	title: string;
	type?: 'button' | 'submit' | 'reset';
	isNoBackGround?: boolean;
	disabled?: boolean;
};

export const Button: FC<ButtonPropsType> = ({ callback, title, type, isNoBackGround, disabled }) => {
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

