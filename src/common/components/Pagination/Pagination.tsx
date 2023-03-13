import React, {FC} from 'react';
import s from './pagination.module.scss'
import {ReactComponent as Arrow} from "common/icons/paginationArrow.svg";

type Props = {
  callback: () => void
}

export const Pagination: FC<Props> = ({callback}) => {

  const onClickHandler = () => {
    callback()
  }

  return <button onClick={onClickHandler} className={s.paginationButton}>Show more{<Arrow/>}</button>
};

