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
import { isLoadingSelector } from 'app';
import * as Yup from 'yup';

export const Login = () => {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector(isLoggedInSelector);
	const isLoading = useAppSelector(isLoadingSelector);

	const formik = useFormik({
		initialValues: {
			loginOrEmail: '',
			password: '',
			commonError: '',
		},
		validationSchema: Yup.object({
			loginOrEmail: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(2, 'Min length 2 symbols').required('Required')
		}),
		onSubmit: async values => {
			const resultAction = await dispatch(
				login({
					loginOrEmail: values.loginOrEmail.toLowerCase(),
					password: values.password,
				})
			);
			if (resultAction.payload) {
				formik.setErrors({ commonError: resultAction.payload as string });
			}
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
					<Input
						title="Email or Username"
						component="input"
						{...formik.getFieldProps('loginOrEmail')}
						error={(formik.touched.loginOrEmail && formik.errors.loginOrEmail) || ''}
					/>
					<Input
						title="Password"
						component="input" password
						{...formik.getFieldProps('password')}
						error={(formik.touched.password && formik.errors.password) || ''}
					/>
					{formik.errors.commonError && <div className={s.error}>{formik.errors.commonError}</div>}
					<Button type="submit" title="Sign in" disabled={isLoading} />
				</form>
				<span className={s.forgotPass}>Don’t have an account?</span>
				<NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
			</AuthWrapper>
			<img src={loginBanner} alt="login banner" />
		</>
	);
};
