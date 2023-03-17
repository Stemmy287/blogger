import React from 'react';
import s from 'app/NavBar/navBar.module.scss'
import {PATH} from "common/constans/path";
import {NavBarLink} from "common/components/Link/Link";
import {ReactComponent as BurgerMenu} from 'common/icons/Burger.svg'
import {ReactComponent as SquareMenu} from 'common/icons/SquareMenu.svg'

export const NavBar = () => {
    return (
      <div className={s.navBarContainer}>
          <NavBarLink to={PATH.BLOGS} title={'Blogs'} icon={<BurgerMenu/>}/>
          <NavBarLink to={PATH.POSTS} title={'Posts'} icon={<SquareMenu/>}/>
      </div>
    );
};

