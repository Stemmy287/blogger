import React from 'react';
import s from './PopUp.module.scss';

type PropsType = {
	children: JSX.Element;
	onClose: () => void;
};

export const PopUp = ({ children, onClose }: PropsType) => {
	return (
		<div className={s.modal} onClick={onClose}>
			<div
				className={s.content}
				onClick={e => {
					e.stopPropagation();
				}}
			>
				{children}
			</div>
		</div>
	);
};

