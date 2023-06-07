import React, { useState } from 'react';
import s from './Header.module.scss';
import { useAppSelector } from 'hooks';
import { isLoggedInSelector, userSelector } from 'modules/authModule';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { PopUp } from 'common/components';
import { Notification } from 'common/components';
import { useAppDispatch } from 'hooks';
import { logout } from 'modules/authModule';
import { LoadingLine } from 'common/components';
import { isLoadingSelector } from 'app';

export const Header = () => {
	const [isActive, setIsActive] = useState(false);

	const isLoggedIn = useAppSelector(isLoggedInSelector);
	const isLoading = useAppSelector(isLoadingSelector);
	const user = useAppSelector(userSelector);

	const dispatch = useAppDispatch();
	const logoutHandler = () => {
		dispatch(logout());
	};
	const onCloseHandler = () => {
		setIsActive(false);
	};
	const onModalHandler = () => {
		setIsActive(true);
	};

	return (
		<header className={s.container}>
			<h2>Blogger Platform</h2>
			{isLoggedIn && (
				<div className={s.userAndLogout}>
					<h3 className={s.userName}>{user.login}</h3>
					<div className={s.logout} onClick={onModalHandler}>
						<LogoutIcon />
						<span>login out</span>
					</div>
				</div>
			)}
			{isActive && (
				<PopUp onClose={onCloseHandler}>
					<Notification
						title="login out"
						message={`Do you really want to log out of your account: ${user.email}`}
						onClose={setIsActive}
						callback={logoutHandler}
					/>
				</PopUp>
			)}
			{isLoading && <LoadingLine />}
		</header>
	);
};
