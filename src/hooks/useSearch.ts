import { useEffect, useState } from 'react';
import { useDebounce } from 'hooks';

export const useSearch = (searchHandler: (debouncedSearchValue: string) => void) => {
	const [searchValue, setSearchValue] = useState('');

	const debouncedSearchNameTerm = useDebounce(searchValue, 750);

	useEffect(() => {
		searchHandler(debouncedSearchNameTerm);
	}, [debouncedSearchNameTerm]);

	return { searchValue, setSearchValue };
};