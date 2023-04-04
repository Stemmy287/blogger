import React from 'react';
import s from './comment.module.scss'
import noPhoto from 'common/image/no-image.svg'

export const Comment = () => {
  return (
    <div className={s.comment_container}>
      <img src={noPhoto} alt="photo"/>
      <div className={s.comment_content}>
        <div className={s.user_info}>
          <h2 className={s.name}>Ivan Yakimenko</h2>
          <span className={s.date}>03/01/2021</span>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, magna felis vestibulum metus aptent velit, tempor posuere natoque habitasse phasellus dignissim.</p>
      </div>
    </div>
  );
};

