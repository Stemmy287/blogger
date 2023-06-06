import React, { useEffect, useRef, useState } from 'react';
import s from './BlogOnPage.module.scss';
import defaultBlogImage from 'assets/image/defaultBlogImg.png';
import { currentURL } from 'common/utils';
import { dateConvertor } from 'common/utils';
import { ReactComponent as ArrowText } from 'assets/icons/arrowText.svg';

type PropsType = {
	title: string;
	webSiteUrl: string;
	description: string;
	date: string;
};

export const BlogOnPage = ({ title, webSiteUrl, description, date }: PropsType) => {
	const [isAllText, setIsAllText] = useState(true);
	const [isShowButton, setIsShowButton] = useState(false);

	const onAllTextHandler = () => {
		setIsAllText(!isAllText);
	};

	const textBlockRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (description && textBlockRef.current) {
			if (textBlockRef.current.offsetHeight > 48) {
					setIsShowButton(true);
					setIsAllText(false)
			} else {
				isShowButton && setIsShowButton(false)
			}
		}
	}, [description]);

	return (
		<div className={s.container}>
			<img src={defaultBlogImage} alt="blog avatar" />
			<div className={s.content}>
				<h2 className={s.title}>{title}</h2>
				<div className={s.meta}>
					<span className={s.date}>
						<b>Blog creation date:</b> {dateConvertor(date)}
					</span>
					<span className={s.website}>
						<b>Website:</b>
						<a href={currentURL(webSiteUrl)} target="_blank" rel="noreferrer">
							{currentURL(webSiteUrl)}
						</a>
					</span>
				</div>
				<div className={s.descContainer}>
					<p className={isAllText ? s.desc : `${s.desc} ${s.notAllText}`} ref={textBlockRef}>{description}</p>
					{isShowButton && (
						<button className={s.showMore} onClick={onAllTextHandler}>
							{isAllText ? (
								<>
									Show less <ArrowText className={s.iconRevert} />
								</>
							) : (
								<>
									Show more <ArrowText />
								</>
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
