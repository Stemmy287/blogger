import React, { useState } from 'react';
import s from './Registration.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useFormik } from 'formik';
import { AuthWrapper, Button, Input, Notification, PopUp } from 'common/components';
import { NavLink, useNavigate } from 'react-router-dom';
import loginBanner from 'assets/image/rafiki.svg';
import { registration } from 'modules/authModule';
import { PATH } from 'common/constans';
import { isLoadingSelector } from 'app';
import * as Yup from 'yup';

export const Registration = () => {
	const dispatch = useAppDispatch();

	const [isActive, setIsActive] = useState(false);
	const [successes, setSuccesses] = useState(false);

	const isLoading = useAppSelector(isLoadingSelector);

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
			commonError: '',
		},
		validationSchema: Yup.object({
			login: Yup.string().min(3, 'Min length 3 symbols')
				.max(10, 'Max length 10 symbols')
				.required('Required'),
			password: Yup
				.string()
				.min(6, 'Min length 2 symbols')
				.max(21, 'Max length 21 symbols')
				.required('Required'),
			email: Yup
				.string()
				.email('Invalid email address')
				.required('Required')
		}),
		onSubmit: async values => {
			const resultAction = await dispatch(registration(values));
			if (resultAction.payload) {
				formik.setErrors({ commonError: resultAction.payload as string });
			} else {
				setSuccesses(true)
				setIsActive(true);
			}
		},
	});

	return (
		<>
			<AuthWrapper>
				<h3 className={s.title}>Sign Up</h3>
				<form onSubmit={formik.handleSubmit} className={s.form}>
					<Input
						title="Username"
						component="input"
						{...formik.getFieldProps('login')}
						error={(formik.touched.login && formik.errors.login) || ''}
					/>
					<Input
						title="Email"
						component="input"
						{...formik.getFieldProps('email')}
						error={(formik.touched.email && formik.errors.email) || ''}
					/>
					<Input
						title="Password"
						component="input" password
						{...formik.getFieldProps('password')}
						error={(formik.touched.password && formik.errors.password) || ''}
					/>
					{formik.errors.commonError && <div className={s.error}>{formik.errors.commonError}</div>}
					{successes && (
						<span className={s.successesNotify}>
							The link has been sent by email. <br />
							If you don’t receive an email, send link again
						</span>
					)}
					<Button type="submit" title="Sign Up" disabled={isLoading} />
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
