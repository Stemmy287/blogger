import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const appReducer = slice.reducer;
export const { setIsInitialized } = slice.actions;
