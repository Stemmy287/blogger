import React from 'react';
import s from './Title.module.scss';
import arrow from 'assets/icons/arrow.svg';

type PropsType = {
  title: string
  desc?: string
  isDesc?: boolean
}

export const Title = ({title, desc, isDesc }: PropsType) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>
        {title}
      </h2>
      {isDesc && (
        <>
          <img src={arrow} alt="arrow"/>
          <span className={s.desc}>{desc}</span>
        </>
      )}
    </div>
  );
};

