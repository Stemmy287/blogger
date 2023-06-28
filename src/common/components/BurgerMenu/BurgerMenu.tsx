import React, { ReactNode, useRef, useState } from 'react';
import s from './BurgerMenu.module.scss';
import burgerMenu from 'assets/icons/BurgerMenu.svg';
import { useOutsideClick } from 'hooks';

type PropsType = {
	children: ReactNode;
};

export const BurgerMenu = ({children}: PropsType) => {
	const [isActive, setIsActive] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	useOutsideClick(selectRef, () => setIsActive(false), isActive);

	const onClickBurgerHandler = () => {
		setIsActive(true);
	};

	return (
		<div className={s.container} ref={selectRef}>
			<img src={burgerMenu} alt="burger menu" className={s.burger} onClick={onClickBurgerHandler} />
			{isActive && (
				<div className={s.buttons}>
					{children}
				</div>
			)}
		</div>
	);
};
