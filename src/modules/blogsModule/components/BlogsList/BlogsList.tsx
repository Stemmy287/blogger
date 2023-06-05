import React from 'react';
import { Blog } from '../Blog/Blog';
import { BlogType } from '../../types';

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
