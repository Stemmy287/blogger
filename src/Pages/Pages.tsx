import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Blogs } from 'modules/blogsModule/components/Blogs/Blogs';
import { Posts } from 'modules/postsModule/components/Posts/Posts';
import { BlogPage } from 'modules/blogsModule/components/BlogPage/BlogPage';
import { PostPage } from 'modules/postsModule/components/PostPage/PostPage';
import { PATH } from 'common/constans/path';
import { Login } from 'modules/authModule/components/Login/Login';
import { WithoutNav } from 'Pages/Layouts/WithoutNav/WithoutNav';
import { WithNav } from 'Pages/Layouts/WithNav/WithNav';
import { Registration } from 'modules/authModule/components/Registration/Registration';

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

