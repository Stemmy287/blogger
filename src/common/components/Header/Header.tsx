import React, { useState } from 'react';
import s from './Header.module.scss';
import { useAppSelector } from 'hooks';
import { isLoggedInSelector, userSelector } from 'modules/authModule';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { BurgerMenu, BurgerMenuButton, PopUp } from 'common/components';
import { Notification } from 'common/components';
import { useAppDispatch } from 'hooks';
import { logout } from 'modules/authModule';
import { LoadingLine } from 'common/components';
import { isLoadingSelector } from 'app';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'common/constans';

export const Header = () => {
	const [isActiveLogout, setIsActiveLogout] = useState(false);

	const isLoggedIn = useAppSelector(isLoggedInSelector);
	const isLoading = useAppSelector(isLoadingSelector);
	const user = useAppSelector(userSelector);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
	};
	const onCloseLogoutHandler = () => {
		setIsActiveLogout(false);
	};
	const onModalLogoutHandler = () => {
		setIsActiveLogout(true);
	};

	const onProfileSettings = () => {
		navigate(PATH.DEVICES);
	};

	return (
		<header className={s.container}>
			<h2>Blogger Platform</h2>
			{isLoggedIn && (
				<div className={s.userAndLogout}>
					<BurgerMenu user={user.login}>
						<BurgerMenuButton title="Profile Setting" callback={onProfileSettings} />
					</BurgerMenu>
					<div className={s.logout} onClick={onModalLogoutHandler}>
						<LogoutIcon />
						<span>login out</span>
					</div>
				</div>
			)}
			{isActiveLogout && (
				<PopUp onClose={onCloseLogoutHandler}>
					<Notification
						title="login out"
						message={`Do you really want to log out of your account: ${user.email}`}
						onClose={setIsActiveLogout}
						callback={logoutHandler}
					/>
				</PopUp>
			)}
			{isLoading && <LoadingLine />}
		</header>
	);
};
