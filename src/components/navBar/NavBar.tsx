import React from 'react';
import s from './navBar.module.scss'
import burgerMenu from '../../common/icons/BurgerMenu.svg'
import squareMenu from '../../common/icons/SquareMenu.svg'
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <div className={s.navBarContainer}>
            <div className={s.navLinks}>
                <NavLink to={'/blogs'} className={s.navLink}>
                    <div>
                        <img src={burgerMenu}/>
                        <span>Blogs</span>
                    </div>
                </NavLink>
                <NavLink to={'/posts'} className={s.navLink}>
                    <div>
                        <img src={squareMenu} className={s.square}/>
                        <span>Posts</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

