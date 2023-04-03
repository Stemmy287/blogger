import React, {FC} from 'react';
import s from 'common/components/Button/button.module.scss'

type ButtonPropsType = {
    callback?: () => void
    title: string
    type?: "button" | "submit" | "reset"
    isNoBackGround?: boolean
}

export const Button: FC<ButtonPropsType> = ({
                                                callback,
                                                title,
                                                type,
                                                isNoBackGround
                                            }) => {
    return (
        <div className={s.buttonContainer}>
            <button type={type || 'button'} className={isNoBackGround ? `${s.button} ${s.noBorder}`  :  s.button} onClick={callback}>{title}</button>
        </div>
    );
};

