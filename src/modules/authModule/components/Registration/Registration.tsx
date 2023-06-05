import React, { useState } from 'react';
import s from './Registration.module.scss';
import { useAppDispatch } from 'hooks';
import { useFormik } from 'formik';
import { AuthWrapper, Button, Input, Notification, PopUp } from 'common/components';
import { NavLink, useNavigate } from 'react-router-dom';
import loginBanner from 'assets/image/rafiki.svg';
import { registration } from 'modules/authModule';
import { PATH } from 'common/constans';

export const Registration = () => {
	const dispatch = useAppDispatch();

	const [isActive, setIsActive] = useState(false);
	const [successes, setSuccesses] = useState(false);

	const navigate = useNavigate();

	const navToLoginHandler = () => {
		setSuccesses(false);
		setIsActive(false);
		navigate(PATH.LOGIN);
	};

	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
			email: '',
		},
		onSubmit(values) {
			dispatch(registration(values));
			setIsActive(true);
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
							The link has been sent by email. <br />
							If you don’t receive an email, send link again
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
			{isActive && (
				<PopUp onClose={navToLoginHandler}>
					<Notification
						title="Email sent"
						message={`Successes you're registered on email ${formik.values.email} `}
						onClose={navToLoginHandler}
						onlyNotify
					/>
				</PopUp>
			)}
		</>
	);
};
