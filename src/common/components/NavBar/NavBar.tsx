import React from 'react';
import s from './navBar.module.scss';
import { PATH } from 'common/constans';
import { Link } from 'common/components';
import { ReactComponent as BurgerMenu } from 'common/icons/BurgerMenuNav.svg';
import { ReactComponent as SquareMenu } from 'common/icons/SquareMenu.svg';

export const NavBar = () => {
	return (
		<div className={s.navBarContainer}>
			<Link to={PATH.BLOGS} title={'Blogs'} icon={<BurgerMenu />} />
			<Link to={PATH.POSTS} title={'Posts'} icon={<SquareMenu />} />
		</div>
	);
};
