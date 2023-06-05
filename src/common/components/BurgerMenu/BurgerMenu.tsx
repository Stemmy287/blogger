import React, { FC, useRef, useState } from 'react';
import s from './BurgerMenu.module.scss';
import burgerMenu from 'assets/icons/BurgerMenu.svg';
import { ReactComponent as EditIcon } from 'assets/icons/Edit.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/Delete.svg';
import { useOutsideClick } from 'hooks';
import { BurgerMenuButton } from 'common/components';

type BurgerMenuType = {
	onEditClick: () => void;
	onDeleteClick: () => void;
};

export const BurgerMenu: FC<BurgerMenuType> = ({ onEditClick, onDeleteClick }) => {
	const [isActive, setIsActive] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	useOutsideClick(selectRef, () => setIsActive(false), isActive);

	const onClickBurgerHandler = () => {
		setIsActive(true);
	};

	const onEditHandler = () => {
		onEditClick();
	};
	const onDeleteHandler = () => {
		onDeleteClick();
	};

	return (
		<div className={s.container} ref={selectRef}>
			<img src={burgerMenu} alt="burger menu" className={s.burger} onClick={onClickBurgerHandler} />
			{isActive && (
				<div className={s.buttons}>
					<BurgerMenuButton title="Delete" callback={onDeleteHandler} icon={<DeleteIcon/>} />
					<BurgerMenuButton title="Edit" callback={onEditHandler} icon={<EditIcon/>} />
				</div>
			)}
		</div>
	);
};
