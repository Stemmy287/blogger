import React, {FC, MouseEvent, useState} from 'react';
import s from "common/components/Select/select.module.scss";
import {ReactComponent as ArrowDown} from "common/icons/arrowDown.svg";
import {ReactComponent as ArrowUp} from "common/icons/arrowUp.svg";

type Props = {
  selected: string
  setSelected: (selected: string) => void
  options: string[]
}

export const Select: FC<Props> = ({selected, setSelected, options}) => {

  const [isActive, setIsActive] = useState(false)

  const onActiveHandler = () => {
    setIsActive(!isActive)
  }
  const onSelectHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (e.currentTarget.textContent) {
      setSelected(e.currentTarget.textContent)
      setIsActive(false)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.select} onClick={onActiveHandler}>
        {selected || options[0]}
        {isActive ? <ArrowUp/> : <ArrowDown/>}
      </div>
      {isActive && (
        <div className={s.optionsList}>
          {options.map(option =>
            <div className={s.option} onClick={onSelectHandler}>
              {option}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

