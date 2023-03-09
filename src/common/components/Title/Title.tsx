import React, {FC} from 'react';
import s from 'common/components/Title/title.module.scss'
import arrow from 'common/icons/arrow.svg'

type TitlePropsType = {
    title: string
    desc?: string
    isDesc: boolean
}

export const Title: FC<TitlePropsType> = ({
                                              title,
                                              desc,
                                              isDesc
                                          }) => {
    return (
        <div className={s.titleContainer}>
            <h2 className={s.title}>
                {title}
            </h2>
            {isDesc &&
                <div className={s.descBlock}>
                    <img src={arrow} alt={'arrow'}/>
                    <span className={s.desc}>{desc}</span>
                </div>}
        </div>
    );
};

