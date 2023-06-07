import React from 'react';
import { Blog } from 'modules/blogsModule';
import { BlogType } from 'modules/blogsModule';

type PropsType = {
	blogs: BlogType[];
};

export const BlogsList = ({ blogs }: PropsType) => {

	return (
		<>
			{blogs?.map(bg => (
				<Blog
					key={bg.id}
					blogId={bg.id}
					title={bg.name}
					webSiteUrl={bg.websiteUrl}
					description={bg.description}
				/>
			))}
		</>
	);
};
