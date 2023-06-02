import React, { FC } from 'react';
import s from 'common/components/Button/button.module.scss';

type ButtonPropsType = {
	callback?: () => void;
	title: string;
	type?: 'button' | 'submit' | 'reset';
	isNoBackGround?: boolean;
	disabled?: boolean;
};

export const Button: FC<ButtonPropsType> = ({ callback, title, type, isNoBackGround, disabled }) => {
	return (
		<div className={s.buttonContainer}>
			<button
				type={type || 'button'}
				className={isNoBackGround ? `${s.button} ${s.noBorder}` : s.button}
				onClick={callback}
				disabled={disabled}
			>
				{title}
			</button>
		</div>
	);
};

