import React, { FC, useRef, useState } from 'react';
import s from './BurgerMenu.module.scss';
import burgerMenu from 'common/icons/BurgerMenu.svg';
import {ReactComponent as EditIcon } from 'common/icons/Edit.svg';
import {ReactComponent as DeleteIcon} from 'common/icons/Delete.svg';
import { useOutsideClick } from 'hooks';

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
	const onBlurButtonsHandler = () => {
		setIsActive(false);
	};
	const onClickEditHandler = () => {
		onEditClick();
	};
	const onClickDeleteHandler = () => {
		onDeleteClick();
	};

	return (
		<div className={s.burgerMenuContainer} ref={selectRef}>
			<img src={burgerMenu} alt={'burger menu'} className={s.burger} onClick={onClickBurgerHandler} />
			{isActive && (
				<div className={s.buttons} onBlur={onBlurButtonsHandler}>
					<button className={s.button} onClick={onClickDeleteHandler}>
						<span>Delete</span>
						<DeleteIcon className={s.icon}/>
					</button>
					<button className={s.button} onClick={onClickEditHandler}>
						<span>Edit</span>
						<EditIcon className={s.icon}/>
					</button>
				</div>
			)}
		</div>
	);
};
