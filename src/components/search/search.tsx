import React from 'react';
import s from './search.module.scss'
import {Select} from "./select/Select";

export const Search = () => {
    return (
        <div className={s.searchContainer}>
            <input type="text" className={s.input} placeholder="Search"/>
            <Select/>
        </div>
    );
};

