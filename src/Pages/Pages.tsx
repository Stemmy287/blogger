import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Blogs } from 'modules/blogsModule';
import { Posts } from 'modules/postsModule';
import { BlogPage } from 'modules/blogsModule';
import { PostPage } from 'modules/postsModule';
import { PATH } from 'common/constans';
import { Login } from 'modules/authModule';
import { WithoutNav } from 'Pages';
import { WithNav } from 'Pages';
import { Registration } from 'modules/authModule';

export const Pages = () => {
	return (
		<Routes>
			<Route element={<WithoutNav />}>
				<Route path={PATH.LOGIN} element={<Login />} />
				<Route path={PATH.REGISTRATION} element={<Registration />} />
			</Route>
			<Route element={<WithNav />}>
				<Route path={PATH.MAIN} element={<Blogs />} />
				<Route path={PATH.BLOGS} element={<Blogs />} />
				<Route path={PATH.POSTS} element={<Posts />} />
				<Route path={PATH.BLOG_PAGE} element={<BlogPage />} />
				<Route path={PATH.POST_PAGE} element={<PostPage />} />
			</Route>
		</Routes>
	);
};

