import React, {FC} from 'react';
import s from './postDeployed.module.scss'

type PostDeployedType = {
    postId: string
    blogName: string
    postName: string
    date: string
    content: string
}

export const PostDeployed: FC<PostDeployedType> = ({
                                                       postId,
                                                       blogName,
                                                       postName,
                                                       date,
                                                       content
                                                   }) => {
    return (
        <div className={s.postDeployedContainer}>
            <div className={s.blogInfo}>
                <img src="" alt=""/>
                <h3>{blogName}</h3>
            </div>
            <div className={s.postInfo}>
                <h2>{postName}</h2>
                <span>{date}</span>
            </div>
            <div className={s.content}>
                <img src=""/>
                <div>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

