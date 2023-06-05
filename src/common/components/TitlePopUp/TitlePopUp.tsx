import React from 'react';
import s from './TitlePopUp.module.scss';
import close from 'assets/icons/Close.svg';

type PropsType = {
	title: string;
	onClose: () => void;
};

export const TitlePopUp = ({ title, onClose }: PropsType) => {
	return (
		<div className={s.container}>
			<h4>{title}</h4>
			<img src={close} alt={'close'} onClick={onClose} />
		</div>
	);
};
