import { Pages } from 'Pages/Pages';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { authTC } from 'modules/authModule/authSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { isInitializedSelector } from 'app/appSelectors';

export function App() {
	const dispatch = useAppDispatch();

	const isInitialized = useAppSelector(isInitializedSelector);

	useEffect(() => {
		dispatch(authTC());
	}, [dispatch]);

	if (!isInitialized) {
		return <div>...loading</div>;
	}

	return <Pages />;
}


