import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'app',
	initialState: {
		isInitialized: false,
		isLoading: false,
	},
	reducers: {
		setIsInitialized(state) {
			state.isInitialized = true;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			action => action.type.endsWith('/pending'),
			state => {
				state.isLoading = true;
			}
		);
		builder.addMatcher(
			action => action.type.endsWith('/fulfilled'),
			state => {
				state.isLoading = false;
			}
		);
		builder.addMatcher(
			action => action.type.endsWith('/rejected'),
			state => {
				state.isLoading = false;
			}
		);
	},
});

export const appReducer = slice.reducer;
export const { setIsInitialized } = slice.actions;
