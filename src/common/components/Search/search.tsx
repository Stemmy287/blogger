import React from 'react';
import s from 'common/components/Search/search.module.scss'
import {Select} from "common/components/Search/Select/Select";

export const Search = () => {
    return (
        <div className={s.searchContainer}>
            <input type="text" className={s.input} placeholder="Search"/>
            <Select/>
        </div>
    );
};

