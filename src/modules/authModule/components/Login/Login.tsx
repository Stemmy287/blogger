import React from 'react';
import s from 'modules/authModule/components/Login/login.module.scss';
import { useFormik } from 'formik';
import { Button } from 'common/components/Button/Button';
import { Navigate, NavLink } from 'react-router-dom';
import loginBanner from 'common/image/rafiki.svg';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { loginTC } from 'modules/authModule/authSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { isLoggedInSelector } from 'modules/authModule/authSelectors';
import { PATH } from 'common/constans/path';
import { AuthWrapper } from '../../../../common/components/AuthWrapper/AuthWrapper';
import { Input } from '../../../../common/components/Input/Input';

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
				loginTC({
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
					<div className={s.button}>
						<Button type="submit" title="Sign in" />
					</div>
				</form>
				<span className={s.forgotPass}>Don’t have an account?</span>
				<NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
			</AuthWrapper>
			<img src={loginBanner} alt="login banner" />
		</>
	);
};
