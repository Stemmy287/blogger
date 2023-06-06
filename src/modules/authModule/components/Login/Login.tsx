import React from 'react';
import s from './Login.module.scss';
import { useFormik } from 'formik';
import { Button } from 'common/components';
import { Navigate, NavLink } from 'react-router-dom';
import loginBanner from 'assets/image/rafiki.svg';
import { useAppDispatch } from 'hooks';
import { login } from 'modules/authModule';
import { useAppSelector } from 'hooks';
import { isLoggedInSelector } from 'modules/authModule';
import { PATH } from 'common/constans';
import { AuthWrapper } from 'common/components';
import { Input } from 'common/components';

export const Login = () => {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector(isLoggedInSelector);

	const formik = useFormik({
		initialValues: {
			loginOrEmail: '',
			password: '',
		},
		onSubmit(values) {
			dispatch(
				login({
					loginOrEmail: values.loginOrEmail.toLowerCase(),
					password: values.password,
				})
			);
		},
	});

	if (isLoggedIn) {
		return <Navigate to={PATH.BLOGS} />;
	}

	return (
		<>
			<AuthWrapper>
				<h3 className={s.title}>Sign In</h3>
				<form onSubmit={formik.handleSubmit} className={s.form}>
					<Input title="Email or Username" component="input" {...formik.getFieldProps('loginOrEmail')} />
					<Input title="Password" component="input" password {...formik.getFieldProps('password')} />
					<Button type="submit" title="Sign in" />
				</form>
				<span className={s.forgotPass}>Don’t have an account?</span>
				<NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
			</AuthWrapper>
			<img src={loginBanner} alt="login banner" />
		</>
	);
};
