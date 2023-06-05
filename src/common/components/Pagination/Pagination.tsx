import React, { FC } from 'react';
import s from './Pagination.module.scss';
import { ReactComponent as Arrow } from 'assets/icons/paginationArrow.svg';

type Props = {
  callback: () => void
}

export const Pagination: FC<Props> = ({callback}) => {

  const onClickHandler = () => {
    callback()
  }

  return <button onClick={onClickHandler} className={s.paginationButton}>Show more{<Arrow/>}</button>
};

