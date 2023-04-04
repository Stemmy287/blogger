import React from 'react';
import s from './comments.module.scss'
import {FormInput} from "common/components/FormInput/FormInput";
import {Comment} from "features/Posts/Comments/Comment/Comment";
import {Pagination} from "common/components/Pagination/Pagination";

export const Comments = () => {
  return (
    <div className={s.comments_container}>
      <h3 className={s.header}>Comments (189)</h3>
      <FormInput value={''} onChange={() => {}} component={'textarea'}/>
      <div className={s.comments}>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
      </div>
      <div className={s.pagination}>
        <Pagination callback={() => {}}/>
      </div>
    </div>
  );
};

