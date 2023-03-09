import React, {FC} from 'react';
import s from 'common/components/BackLink/backLink.module.scss'
import arrow from 'common/icons/arrowBackLink.svg'
import {NavLink} from "react-router-dom";

type BackLinkPropsType = {
    link: string
    where: string
}

export const BackLink: FC<BackLinkPropsType> = ({
                                                    link,
                                                    where
                                                }) => {
    return (
        <NavLink to={link} className={s.backLink}>
            <img src={arrow} alt={'arrow'}/>
            <span className={s.desc}>Back to {where}</span>
        </NavLink>
    );
};

