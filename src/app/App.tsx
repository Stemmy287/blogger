import { Pages } from 'Pages';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'hooks';
import { auth } from 'modules/authModule';
import { useAppSelector } from 'hooks';
import { isInitializedSelector } from 'app';

export function App() {
	const dispatch = useAppDispatch();

	const isInitialized = useAppSelector(isInitializedSelector);

	useEffect(() => {
		dispatch(auth());
	}, [dispatch]);

	if (!isInitialized) {
		return <div>...loading</div>;
	}

	return <Pages />;
}


