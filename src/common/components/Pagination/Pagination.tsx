import React from 'react';
import s from './Pagination.module.scss';
import { ReactComponent as Arrow } from 'assets/icons/paginationArrow.svg';

type PropsType = {
  callback: () => void
}

export const Pagination = ({callback}: PropsType) => {

  const onClickHandler = () => {
    callback()
  }

  return <button onClick={onClickHandler} className={s.paginationButton}>Show more{<Arrow/>}</button>
};

