import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiLogin, LoginType} from "features/Login/loginApi";

export const loginTC = createAsyncThunk('login/loginTC', async (param: LoginType, {dispatch, rejectWithValue}) => {
  try {
    await apiLogin.login(param)
    dispatch(setIsLoggedIn({isLoggedIn: true}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})

export const loginSlice = slice.reducer
export const {setIsLoggedIn} = slice.actions