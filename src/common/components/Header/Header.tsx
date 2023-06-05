import React, { useState } from 'react';
import s from './header.module.scss';
import { useAppSelector } from 'hooks';
import { isLoggedInSelector, userSelector } from 'modules/authModule';
import { ReactComponent as LogoutIcon } from 'common/icons/Logout.svg';
import { PopUp } from 'common/components';
import { Notification } from 'common/components';
import { useAppDispatch } from 'hooks';
import { logoutTC } from 'modules/authModule';

export const Header = () => {
	const [isActive, setIsActive] = useState(false);

	const isLoggedIn = useAppSelector(isLoggedInSelector);
	const user = useAppSelector(userSelector);

	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logoutTC());
	};

	return (
		<header className={s.headerContainer}>
			<h2>Blogger Platform</h2>
			{isLoggedIn && (
				<div className={s.userAndLogout}>
					<h3 className={s.userName}>{user.login}</h3>
					<div className={s.logout} onClick={() => setIsActive(true)}>
						<LogoutIcon />
						<span>login out</span>
					</div>
				</div>
			)}
			<PopUp isActive={isActive} setIsActive={setIsActive}>
				<Notification
					title="login out"
					message={`Do you really want to log out of your account: ${user.email}`}
					onClose={setIsActive}
					callback={logoutHandler}
				/>
			</PopUp>
		</header>
	);
};
