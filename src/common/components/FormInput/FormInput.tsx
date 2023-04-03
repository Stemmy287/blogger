import React, {ChangeEvent, FC, useState} from 'react';
import s from 'common/components/FormInput/formInput.module.scss'
import {ReactComponent as Eye} from "common/icons/visibility.svg";

type InputPropsType = {
  title: string
  value: string
  onChange: (title: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
  component: 'input' | 'textarea'
  name: string
  password?: boolean
}

export const FormInput: FC<InputPropsType> = ({
                                            title,
                                            value,
                                            onChange,
                                            component,
                                            name,
                                            password
                                          }) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
  }

  const [showPassword, setShowPassword] = useState(true)

  const onShowHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={s.inputContainer}>
      <span>{title}</span>
      {component === 'input'
        ?
        <>
          <input type={'text'} value={value} data-showpassword={password && showPassword} onChange={onChangeHandler} name={name}/>
          {password && <Eye className={s.showPassword} onClick={onShowHandler}/>}
        </>
        :
        <textarea value={value} onChange={onChangeHandler} name={name}></textarea>}
    </div>
  );
};

