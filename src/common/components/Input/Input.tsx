import React, {ChangeEvent, FC, useEffect} from 'react';
import s from './input.module.scss'
import {useDebounce} from "hooks/useDebounce";

type Props = {
  searchValue: string
  onChange: (searchValue: string) => void
  searchHandler: (searchValue: string) => void
}

export const Input:FC<Props> = ({searchValue, onChange, searchHandler}) => {

  const debouncedSearchNameTerm = useDebounce(searchValue, 750)

  const onChangeSearchNameTermLocal = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }

  useEffect(() => {
    searchHandler(debouncedSearchNameTerm)
  }, [debouncedSearchNameTerm])

  return (
    <input className={s.input} value={searchValue} onChange={onChangeSearchNameTermLocal} placeholder="Search"/>
  );
};


