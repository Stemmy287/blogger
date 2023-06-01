import React, { FC } from 'react';
import s from 'common/components/BackLink/backLink.module.scss';
import arrow from 'common/icons/arrowBackLink.svg';
import { NavLink } from 'react-router-dom';

type BackLinkPropsType = {
	link: string;
	to: string;
};

export const BackLink: FC<BackLinkPropsType> = ({
                                                  link,
                                                  to
                                                }) => {
  return (
      <NavLink to={link} className={s.backLink}>
        <img src={arrow} alt={'arrow'}/>
        Back to {to}
      </NavLink>
  );
};

