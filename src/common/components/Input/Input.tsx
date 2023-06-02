import React, { DetailedHTMLProps, FC, InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react';
import s from './input.module.scss';
import { ReactComponent as GlassMag } from 'common/icons/glassMag.svg';
import { ReactComponent as Eye } from 'common/icons/visibility.svg';

type Props = {
	component: 'input' | 'searchInput' | 'textarea';
	title?: string;
	placeholder?: string;
	password?: boolean;
};

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
	DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const Input: FC<Props & DefaultInputPropsType> = ({ component, title, placeholder, password, ...restProps }) => {
	const [showPassword, setShowPassword] = useState(true);

	const onShowHandler = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={s.container}>
			{component === 'input' || 'searchInput' ? (
				<>
					{title && <span>{title}</span>}
					<input
						className={component === 'input' ? s.input : s.searchInput}
						placeholder={placeholder}
						data-showpassword={password && showPassword}
						{...restProps}
					/>
					{component === 'searchInput' && <GlassMag className={s.glassMag} />}
					{password && <Eye className={s.showPassword} onClick={onShowHandler} />}
				</>
			) : (
				<textarea className={s.textarea} placeholder={placeholder} {...restProps} />
			)}
		</div>
	);
};


