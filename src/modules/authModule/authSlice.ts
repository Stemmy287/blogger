import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAuth, LoginType, RegistrationDataType, UserType } from 'modules/authModule';
import { setIsInitialized } from 'app';

export const login = createAsyncThunk('auth/loginTC', async (param: LoginType, { dispatch, rejectWithValue }) => {
	try {
		const res = await apiAuth.login(param);
		localStorage.setItem('accessToken', res.accessToken);
		dispatch(auth());
	} catch (e) {
		return rejectWithValue('The password or email or Username is incorrect. Please try again');
	}
});
export const auth = createAsyncThunk('auth/authTC', async (param, { dispatch, rejectWithValue }) => {
	try {
		const res = await apiAuth.auth();
		return {user: res, isLoggedIn: true}
	} catch (e) {
		return rejectWithValue(null);
	} finally {
		dispatch(setIsInitialized());
	}
});
export const logout = createAsyncThunk('auth/loginTC', async (param, { rejectWithValue }) => {
	try {
		await apiAuth.logout();
		localStorage.removeItem('accessToken');
		return
	} catch (e) {
		return rejectWithValue(null);
	}
});
export const registration = createAsyncThunk(
	'auth/registrationTC',
	async (param: RegistrationDataType, { rejectWithValue }) => {
		try {
			await apiAuth.registration(param);
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		user: {} as UserType,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(auth.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
			state.user = action.payload.user
		})
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoggedIn = false
		})
	}
});

export const authReducer = slice.reducer;