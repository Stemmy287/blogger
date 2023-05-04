import React from 'react';
import s from 'features/Auth/Login/login.module.scss'
import {useFormik} from "formik";
import {FormInput} from "common/components/FormInput/FormInput";
import {Button} from "common/components/Button/Button";
import {Navigate, NavLink} from "react-router-dom";
import loginBanner from "common/image/rafiki.svg"
import {useAppDispatch} from "hooks/useAppDispatch";
import {loginTC} from "features/Auth/authSlice";
import {useAppSelector} from "hooks/useAppSelector";
import {isLoggedInSelector} from "features/Auth/authSelectors";
import {PATH} from "common/constans/path";

export const Login = () => {

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const formik = useFormik({
    initialValues: {
      loginOrEmail: '',
      password: ''
    },
    onSubmit(values,formikHelpers) {
      dispatch(loginTC({loginOrEmail: values.loginOrEmail.toLowerCase(), password: values.password}))
        .then(res => {
          if (res.payload) {
            formikHelpers.setFieldError('loginOrEmail', res.payload.toString())
          }
        })
    }
  })

  if(isLoggedIn) {
    return <Navigate to={PATH.BLOGS}/>
  }

  return (
    <div className={s.login_container}>
      <div className={s.login_form_block}>
        <h3 className={s.title}>Sign In</h3>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <FormInput title="Email or Username" component="input" {...formik.getFieldProps('loginOrEmail')}/>
          <FormInput title="Password" component="input" password {...formik.getFieldProps('password')}/>
          {formik.errors.loginOrEmail && <div className={s.error}>{formik.errors.loginOrEmail}</div>}
          <div className={s.button}>
            <Button type={"submit"} title="Sign in"/>
          </div>
        </form>
        <span className={s.forgotPass}>Don’t have an account?</span>
        <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
      </div>
      <img src={loginBanner} alt="login banner"/>
    </div>
  );
};

