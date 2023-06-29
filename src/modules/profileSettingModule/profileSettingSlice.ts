import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeviceType, profileSettingApi } from 'modules/profileSettingModule';

export const fetchDevices = createAsyncThunk('profileSetting/fetchDevices', async (param, { rejectWithValue }) => {
	try {
		return profileSettingApi.getDevices();
	} catch (e) {
		return rejectWithValue(e);
	}
});

const slice = createSlice({
	name: 'profileSetting',
	initialState: {
		devices: [] as DeviceType[],
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchDevices.fulfilled, (state, action) => {
			state.devices = action.payload
		})
	}
});

export const profileSettingReducer = slice.reducer;
