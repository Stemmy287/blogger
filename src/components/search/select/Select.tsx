import React from 'react';
import s from "./select.module.scss";

export const Select = () => {
    return (
        <select name="" id="" className={s.select}>
            <option className={s.option}>New blogs first</option>
            <option className={s.option}>Old blogs first</option>
            <option className={s.option}>From A to Z</option>
            <option className={s.option}>From Z to A</option>
        </select>
    );
};

