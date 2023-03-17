import React, {FC, ReactNode} from 'react';
import s from "./link.module.scss";
import {NavLink} from "react-router-dom";

type Props = {
  to: string
  title: string
  icon: ReactNode
}

export const NavBarLink: FC<Props> = ({to, title, icon}) => {
  return (
    <NavLink to={to} className={s.navLink}>
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

