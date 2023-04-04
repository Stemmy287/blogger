import React from 'react';
import s from './comment.module.scss'
import noPhoto from 'common/image/no-image.svg'
import {BurgerMenu} from "common/components/BurgerMenu/BurgerMenu";

export const Comment = () => {
  return (
    <div className={s.comment_container}>
      <img className={s.photo} src={noPhoto} alt="photo"/>
      <div className={s.comment_content}>
        <div className={s.user_info}>
          <h2 className={s.name}>Ivan Yakimenko</h2>
          <span className={s.date}>03/01/2021</span>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, magna felis vestibulum metus aptent velit, tempor posuere natoque habitasse phasellus dignissim.</p>
      </div>
      <div className={s.burger_menu}>
        <BurgerMenu onEditClick={() => {}} onDeleteClick={() => {}}/>
      </div>
    </div>
  );
};

