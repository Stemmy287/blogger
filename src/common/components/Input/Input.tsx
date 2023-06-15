import React, { useState } from 'react';
import s from './Input.module.scss';
import { ReactComponent as GlassMag } from 'assets/icons/glassMag.svg';
import { ReactComponent as Eye } from 'assets/icons/visibility.svg';
import { DefaultInputPropsType, DefaultTextAreaPropsType } from 'app';

type PropsType = {
	component: 'input' | 'searchInput' | 'textarea';
	title?: string;
	password?: boolean;
	error?: string
};
export const Input = ({
	component,
	title,
	error,
	password,
	...restProps
}: PropsType & DefaultInputPropsType & DefaultTextAreaPropsType) => {
	const [showPassword, setShowPassword] = useState(true);

	const onShowHandler = () => {
		setShowPassword(!showPassword);
	};

	const isInput = (component === 'input' || 'searchInput') && (component !== 'textarea')

	return (
		<div className={s.container}>
			{ isInput && (
				<>
					{title && <span>{title}</span>}
					<div className={s.inputContainer}>
						<input
							className={component === 'input' ? s.input : s.searchInput}
							data-showpassword={password && showPassword}
							{...restProps}
						/>
						{component === 'searchInput' && <GlassMag className={s.glassMag} />}
						{password && <Eye className={s.showPassword} onClick={onShowHandler} />}
					</div>
					{error && <div className={s.error}>{error}</div>}
				</>
			)}
			{component === 'textarea' && <textarea className={s.textarea} {...restProps} />}
		</div>
	);
};
