import React, { useState } from 'react';
import s from './Input.module.scss';
import { ReactComponent as GlassMag } from 'assets/icons/glassMag.svg';
import { ReactComponent as Eye } from 'assets/icons/visibility.svg';
import { DefaultInputPropsType, DefaultTextAreaPropsType } from 'app';

type PropsType = {
	component: 'input' | 'searchInput' | 'textarea';
	title?: string;
	password?: boolean;
};
export const Input = ({
	component,
	title,
	password,
	...restProps
}: PropsType & DefaultInputPropsType & DefaultTextAreaPropsType) => {
	const [showPassword, setShowPassword] = useState(true);

	const onShowHandler = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={s.container}>
			{(component === 'input' || 'searchInput') && component !== 'textarea' && (
				<>
					{title && <span>{title}</span>}
					<input
						className={component === 'input' ? s.input : s.searchInput}
						data-showpassword={password && showPassword}
						{...restProps}
					/>
					{component === 'searchInput' && <GlassMag className={s.glassMag} />}
					{password && <Eye className={s.showPassword} onClick={onShowHandler} />}
				</>
			)}
			{component === 'textarea' && <textarea className={s.textarea} {...restProps} />}
		</div>
	);
};
