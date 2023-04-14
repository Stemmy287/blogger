import React, {ChangeEvent, FC, useState} from 'react';
import s from 'common/components/FormInput/formInput.module.scss'
import {ReactComponent as Eye} from "common/icons/visibility.svg";

type InputPropsType = {
  title?: string
  value: string
  onChange: (title: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: () => void
  component: 'input' | 'textarea'
  name?: string
  password?: boolean
}

export const FormInput: FC<InputPropsType> = ({
                                                title,
                                                value,
                                                onChange,
                                                onFocus,
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
      {title && <span>{title}</span>}
      {component === 'input'
        ?
        <>
          <input
            type={'text'}
            value={value}
            data-showpassword={password && showPassword}
            onChange={onChangeHandler}
            name={name}
          />
          {password && <Eye className={s.showPassword} onClick={onShowHandler}/>}
        </>
        :
        <textarea
          placeholder={'Provide your comment...'}
          value={value}
          onChange={onChangeHandler}
          name={name}
          onFocus={onFocus}
        >
        </textarea>}
    </div>
  );
};

