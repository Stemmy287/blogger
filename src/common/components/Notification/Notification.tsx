import React from 'react';
import s from './Notification.module.scss';
import { Button, TitlePopUp } from 'common/components';

type PropsType = {
	title: string;
	message: string;
	callback?: () => void;
	onClose: (action: boolean) => void;
	onlyNotify?: boolean;
};

export const Notification = ({ title, message, callback, onClose, onlyNotify }: PropsType) => {
	const onCloseHandler = () => {
		onClose(false);
	};
	const onClickHandler = () => {
		callback && callback();
		onCloseHandler();
	};

	return (
		<div className={s.container}>
			<TitlePopUp title={title} onClose={onCloseHandler} />
			<div className={s.messageAndBtn}>
				<div className={s.message}>{message}</div>
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

