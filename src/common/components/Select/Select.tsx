import React, { FC, MouseEvent, useRef, useState } from 'react';
import s from 'common/components/Select/select.module.scss';
import { ReactComponent as ArrowDown } from 'common/icons/arrowDown.svg';
import { ReactComponent as ArrowUp } from 'common/icons/arrowUp.svg';
import { OptionsSelectorType } from 'modules/blogsModule/types';
import { useOutsideClick } from 'hooks/useOutsideClick';

type Props = {
	title: string;
	options: OptionsSelectorType[];
	onChange: (data: OptionsSelectorType) => void;
};
export const Select: FC<Props> = ({ title, options, onChange }) => {
	const [isActive, setIsActive] = useState(false);
	const [selected, setSelected] = useState(title);

	const selectRef = useRef<HTMLDivElement>(null);

	useOutsideClick(selectRef, () => setIsActive(false), isActive);

	const onActiveHandler = () => {
		setIsActive(!isActive);
	};
	const onSelectHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		if (e.currentTarget.dataset.value && e.currentTarget.textContent) {
			onChange({ title: e.currentTarget.textContent, value: e.currentTarget.dataset.value });
			setSelected(e.currentTarget.textContent);
		} else if (e.currentTarget.textContent) {
			onChange({ title: e.currentTarget.textContent });
			setSelected(e.currentTarget.textContent);
		}
		setIsActive(false);
	};

	const mappedOptions = options
		.filter(el => el.title !== selected)
		.map(option => (
			<div
				key={option.title}
				className={s.option}
				onClick={onSelectHandler}
				data-value={option.value && option.value}
			>
				{option.title}
			</div>
		));

	return (
		<div className={s.container} ref={selectRef}>
			<div className={isActive ? `${s.select} ${s.active}` : s.select} onClick={onActiveHandler}>
				{selected}
				{isActive ? <ArrowUp /> : <ArrowDown />}
			</div>
			{isActive && (
				<div className={isActive ? `${s.optionsList} ${s.activeOptions}` : s.optionsList}>{mappedOptions}</div>
			)}
		</div>
	);
};

