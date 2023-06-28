import React, { ReactNode, useRef, useState } from 'react';
import s from './BurgerMenu.module.scss';
import burgerMenu from 'assets/icons/BurgerMenu.svg';
import { useOutsideClick } from 'hooks';

type PropsType = {
	children: ReactNode;
	user?: string;
};

export const BurgerMenu = ({ children, user }: PropsType) => {
	const [isActive, setIsActive] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	useOutsideClick(selectRef, () => setIsActive(false), isActive);

	const onClickBurgerHandler = () => {
		setIsActive(!isActive);
	};

	return (
		<div className={s.container} ref={selectRef}>
			{user ? (
				<h3 className={s.userName} onClick={onClickBurgerHandler}>{user}</h3>
			) : (
				<img src={burgerMenu} alt="burger menu" className={s.burger} onClick={onClickBurgerHandler} />
			)}
			{isActive && <div className={user ? `${s.buttons} ${s.notDots}` : s.buttons}>{children}</div>}
		</div>
	);
};
