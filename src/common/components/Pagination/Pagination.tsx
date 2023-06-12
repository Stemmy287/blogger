import React from 'react';
import s from './Pagination.module.scss';
import { ReactComponent as Arrow } from 'assets/icons/paginationArrow.svg';
import { Preloader } from 'common/components';

type PropsType = {
	callback: () => void;
	isLoading: boolean;
};

export const Pagination = ({ callback, isLoading }: PropsType) => {
	const onClickHandler = () => {
		callback();
	};

	return isLoading ? (
		<div className={s.preloader}>
			<Preloader />
		</div>
	) : (
		<button onClick={onClickHandler} className={s.paginationButton}>
			Show more{<Arrow />}
		</button>
	);
};
