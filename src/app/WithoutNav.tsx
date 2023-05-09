import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "app/Header/Header";

export const WithoutNav = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
};

