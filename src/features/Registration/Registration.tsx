import React from 'react';
import s from './registration.module.scss'
import {useAppDispatch} from "hooks/useAppDispatch";
import {useFormik} from "formik";
import {FormInput} from "common/components/FormInput/FormInput";
import {Button} from "common/components/Button/Button";
import {NavLink} from "react-router-dom";
import loginBanner from "common/image/rafiki.svg";

export const Registration = () => {

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      email: ''
    },
    onSubmit(values) {
    }
  })

  return (
    <div className={s.registration_container}>
      <div className={s.registration_form_block}>
        <h3 className={s.title}>Sign Up</h3>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <FormInput title="Username" component="input" {...formik.getFieldProps('login')}/>
          <FormInput title="Email" component="input" {...formik.getFieldProps('email')}/>
          <FormInput title="Password" component="input" password {...formik.getFieldProps('password')}/>
          <div className={s.button}>
            <Button type={"submit"} title="Sign Un"/>
          </div>
        </form>
        <span className={s.forgotPass}>Already a member?</span>
        <NavLink to="">Sign In</NavLink>
      </div>
      <img src={loginBanner} alt="login banner"/>
    </div>
  );
};

