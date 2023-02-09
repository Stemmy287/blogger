import React from 'react';
import {Title} from "../common/title/Title";
import {Search} from "../search/search";
import {Blog} from "./blog/Blog";
import {useSelector} from "react-redux";
import {ReduxRootType} from "../../redux/store";
import {BlogType} from "../../dal/apiBlogs";

export const Blogs = () => {

    const blogs = useSelector<ReduxRootType, Array<BlogType>>(state => state.blogs.blogs)

    return (
        <div>
            <Title title="Blogs" isDesc={false}/>
            <Search/>
            {blogs.map(bg => <Blog
                key={bg.id}
                blogId={bg.id}
                title={bg.name}
                webSiteUrl={bg.websiteUrl}
                description={bg.description}
            />)}
        </div>
    );
};

