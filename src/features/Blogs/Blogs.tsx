import React from 'react';
import {Title} from "common/components/Title/Title";
import {Search} from "common/components/Search/search";
import {Blog} from "./Blog/Blog";
import {useAppSelector} from "hooks/useAppSelector";

export const Blogs = () => {

    const blogs = useAppSelector(state => state.blogs.blogs)

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

