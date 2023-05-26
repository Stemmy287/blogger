import React, {FC} from 'react';
import s from './postDeployed.module.scss'
import defaultBlogImage from 'common/image/blog2.png'
import defaultPostImage from 'common/image/Best-times-to-post-2022_BTTP-Social-Media.jpg'

type PostDeployedType = {
    blogName: string
    postName: string
    date: string
    content: string
}

export const PostDeployed: FC<PostDeployedType> = ({
                                                       blogName,
                                                       postName,
                                                       date,
                                                       content
                                                   }) => {
    return (
        <div className={s.postDeployedContainer}>
            <div className={s.blogInfo}>
                <img src={defaultBlogImage} alt=""/>
                <h3>{blogName}</h3>
            </div>
            <div className={s.postInfo}>
                <h2>{postName}</h2>
                <span>{date}</span>
            </div>
            <div className={s.content}>
                <img src={defaultPostImage} alt={'banner'}/>
                <div>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

