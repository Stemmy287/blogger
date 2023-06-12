import { Pages } from 'Pages';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'hooks';
import { auth } from 'modules/authModule';
import { useAppSelector } from 'hooks';
import { isErrorSelector, isInitializedSelector } from 'app';
import { Preloader } from 'common/components';
import { ErrorBar } from 'common/components/ErrorBar/ErrorBar';

export function App() {
	const dispatch = useAppDispatch();

	const isInitialized = useAppSelector(isInitializedSelector);
	const isError = useAppSelector(isErrorSelector);

	useEffect(() => {
		dispatch(auth());
	}, [dispatch]);

	if (!isInitialized) {
		return <Preloader />;
	}

	return (
		<>
			<Pages />
			{isError && <ErrorBar />}
		</>
	);
}
