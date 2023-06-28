import React, { ReactNode } from 'react';
import s from './Card.module.scss';

type PropsType = {
	children: ReactNode
	title?: string
};

export const Card = ({ children, title }: PropsType) => {
	return (
		<>
			{title && <h6 className={s.title}>{title}</h6>}
			<div className={s.container}>{children}</div>
		</>
	)
}

