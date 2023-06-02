import React, { FC } from 'react';
import s from 'common/components/Notification/notification.module.scss';
import { Button } from 'common/components/Button/Button';
import { TitlePopUp } from 'common/components/TitlePopUp/TitlePopUp';

type NotificationPropsType = {
	title: string;
	message: string;
	callback?: () => void;
	onClose: (action: boolean) => void;
	onlyNotify?: boolean;
};

export const Notification: FC<NotificationPropsType> = ({ title, message, callback, onClose, onlyNotify }) => {
	const onCloseHandler = () => {
		onClose(false);
	};
	const onClickHandler = () => {
		callback && callback();
		onCloseHandler();
	};

	return (
		<div className={s.notificationContainer}>
			<TitlePopUp title={title} onCloseHandler={onCloseHandler} />
			<div className={s.messageAndBtn}>
				<div className={s.message}>
					<span>{message}</span>
				</div>
				{onlyNotify ? (
					<div className={s.button}>
						<Button title={'OK'} callback={onCloseHandler} />
					</div>
				) : (
					<div className={s.buttons}>
						<Button title={'No'} callback={onCloseHandler} />
						<Button title={'Yes'} isNoBackGround callback={onClickHandler} />
					</div>
				)}
			</div>
		</div>
	);
};

