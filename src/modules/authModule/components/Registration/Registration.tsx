import React, { useState } from 'react';
import s from './registration.module.scss';
import { useAppDispatch } from 'hooks';
import { useFormik } from 'formik';
import { Button } from 'common/components';
import { NavLink, useNavigate } from 'react-router-dom';
import loginBanner from 'common/image/rafiki.svg';
import { PopUp } from 'common/components';
import { Notification } from 'common/components';
import { registrationTC } from 'modules/authModule';
import { PATH } from 'common/constans';
import { AuthWrapper } from 'common/components';
import { Input } from 'common/components';

export const Registration = () => {
	const dispatch = useAppDispatch();

	const [isPopUp, setIsPopUp] = useState(false);
	const [successes, setSuccesses] = useState(false);

	const navigate = useNavigate();

	const navToLoginHandler = () => {
		setSuccesses(false);
		setIsPopUp(false);
		navigate(PATH.LOGIN);
	};

	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
			email: '',
		},
		onSubmit(values) {
			dispatch(registrationTC(values)).then(res => {
				if (res.payload) {
					setSuccesses(true);
					setIsPopUp(true);
				}
			});
		},
	});

	return (
		<>
			<AuthWrapper>
				<h3 className={s.title}>Sign Up</h3>
				<form onSubmit={formik.handleSubmit} className={s.form}>
					<Input title="Username" component="input" {...formik.getFieldProps('login')} />
					<Input title="Email" component="input" {...formik.getFieldProps('email')} />
					<Input title="Password" component="input" password {...formik.getFieldProps('password')} />
					{successes && (
						<span className={s.successesNotify}>
							The link has been sent by email. <br/>If you don’t receive an email, send link again
						</span>
					)}
					<div className={s.button}>
						<Button type="submit" title="Sign Up" />
					</div>
				</form>
				<span className={s.forgotPass}>Already a member?</span>
				<NavLink to={PATH.LOGIN}>Sign In</NavLink>
			</AuthWrapper>
			<img src={loginBanner} alt="login banner" />
			<PopUp isActive={isPopUp} setIsActive={navToLoginHandler}>
				<Notification
					title="Email sent"
					message={`Successes you're registered on email ${formik.values.email} `}
					onClose={navToLoginHandler}
					onlyNotify
				/>
			</PopUp>
		</>
	);
};

