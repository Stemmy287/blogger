import React from 'react';
import s from './NavBar.module.scss';
import { PATH } from 'common/constans';
import { Link } from 'common/components';
import { ReactComponent as BurgerMenu } from 'assets/icons/BurgerMenuNav.svg';
import { ReactComponent as SquareMenu } from 'assets/icons/SquareMenu.svg';

export const NavBar = () => {
	return (
		<div className={s.container}>
			<Link to={PATH.BLOGS} title={'Blogs'} icon={<BurgerMenu />} />
			<Link to={PATH.POSTS} title={'Posts'} icon={<SquareMenu />} />
		</div>
	);
};
