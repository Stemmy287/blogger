import React from 'react';
import {Outlet} from "react-router-dom";
import {NavBar} from "common/components/NavBar/NavBar";
import s from "./WithNav.module.scss";
import {Header} from "common/components/Header/Header";

export const WithNav = () => {
    return (
        <div className={s.container}>
            <Header/>
            <div className={s.NavAndContent}>
                <NavBar/>
                <div className={s.mainContent}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

