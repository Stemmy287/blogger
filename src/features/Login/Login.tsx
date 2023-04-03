import React from 'react';
import s from './login.module.scss'
import {useFormik} from "formik";
import {FormInput} from "common/components/FormInput/FormInput";
import {Button} from "common/components/Button/Button";
import {NavLink} from "react-router-dom";
import loginBanner from "common/image/rafiki.svg"
import {useAppDispatch} from "hooks/useAppDispatch";
import {loginTC} from "features/Login/loginSlice";

export const Login = () => {

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      loginOrEmail: '',
      password: ''
    },
    onSubmit(values) {
      dispatch(loginTC({loginOrEmail: values.loginOrEmail.toLowerCase(), password: values.password}))
    }
  })

  return (
    <div className={s.login_container}>
      <div className={s.login_form_block}>
        <h3 className={s.title}>Sign In</h3>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <FormInput title="Email or Username" component="input" {...formik.getFieldProps('loginOrEmail')}/>
          <FormInput title="Password" component="input" password {...formik.getFieldProps('password')}/>
          <div className={s.button}>
            <Button type={"submit"} title="Sign in"/>
          </div>
        </form>
        <span className={s.forgotPass}>Don’t have an account?</span>
        <NavLink to="">Sign Up</NavLink>
      </div>
      <img src={loginBanner} alt="login banner"/>
    </div>
  );
};

