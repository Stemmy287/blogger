import React from 'react';
import {Outlet} from "react-router-dom";
import {NavBar} from "app/NavBar/NavBar";
import s from "app/App.module.scss";

export const WithNav = () => {
  return (
    <div className={s.NavAndContent}>
      <NavBar/>
      <div className={s.mainContent}>
        <Outlet/>
      </div>
    </div>
  );
};

