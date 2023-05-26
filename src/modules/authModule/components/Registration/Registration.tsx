import React, {useState} from 'react';
import s from 'modules/authModule/components/Registration/registration.module.scss'
import {useAppDispatch} from "hooks/useAppDispatch";
import {useFormik} from "formik";
import {FormInput} from "common/components/FormInput/FormInput";
import {Button} from "common/components/Button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import loginBanner from "common/image/rafiki.svg";
import {PopUp} from "common/components/PopUp/PopUp";
import {Notification} from "common/components/Notification/Notification";
import {registrationTC} from "modules/authModule/authSlice";
import {PATH} from "common/constans/path";

export const Registration = () => {

  const dispatch = useAppDispatch()

  const [isPopUp, setIsPopUp] = useState(false)
  const [successes, setSuccesses] = useState(false)

  const navigate = useNavigate()

  const navToLoginHandler = () => {
    setSuccesses(false)
    setIsPopUp(false)
    navigate(PATH.LOGIN)
  }

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      email: ''
    },
    onSubmit(values) {
      dispatch(registrationTC(values))
        .then(res => {
          if(res.payload) {
            setSuccesses(true)
            setIsPopUp(true)
          }
        })
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
          {successes && <span className={s.successesNotify}>The link has been sent by email.If you don’t receive an email, send link again</span>}
          <div className={s.button}>
            <Button type={"submit"} title="Sign Un"/>
          </div>
        </form>
        <span className={s.forgotPass}>Already a member?</span>
        <NavLink to={PATH.LOGIN}>Sign In</NavLink>
      </div>
      <img src={loginBanner} alt="login banner"/>
      <PopUp isActive={isPopUp} setIsActive={navToLoginHandler}>
        <Notification
          title="Email sent"
          message={`Successes you're registered on email ${formik.values.email} `}
          onClose={navToLoginHandler}
          onlyNotify
        />
      </PopUp>
    </div>
  );
};

