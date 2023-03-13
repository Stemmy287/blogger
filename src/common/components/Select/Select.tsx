import React, {ChangeEvent, FC} from 'react';
import s from "common/components/Select/select.module.scss";

type Props = {
  onChange?: (sortBy: string) => void
}

export const Select:FC<Props> = ({onChange}) => {

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange&& onChange(e.target.value)
  }

  return (
    <select className={s.select} onChange={onChangeHandler}>
      <option className={s.option} value={'desc createdAt'}>New blogs first</option>
      <option className={s.option} value={'asc createdAt'}>Old blogs first</option>
      <option className={s.option} value={'desc name'}>From A to Z</option>
      <option className={s.option} value={'asc name'}>From Z to A</option>
    </select>
  );
};

