import React, { ReactNode } from 'react';
import s from './AuthWrapper.module.scss'

type PropsType = {
	children: ReactNode;
};
export const AuthWrapper = ({ children }: PropsType) => <div className={s.container}>{children}</div>;
