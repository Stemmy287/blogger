import React from 'react';
import s from './Empty.module.scss'

type PropsType = {
	title: string
}

export const Empty = ({ title }: PropsType) => <h4 className={s.empty}>{title}</h4>
