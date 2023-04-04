import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiLogin, LoginType, UserType} from "features/Login/loginApi";
import {setIsInitialized} from "app/appSlice";

export const loginTC = createAsyncThunk('login/loginTC', async (param: LoginType, {dispatch, rejectWithValue}) => {

  try {
    await apiLogin.login(param)
    dispatch(setIsLoggedIn({isLoggedIn: true}))
  } catch (e) {
    return rejectWithValue('The password or email or Username is incorrect. Please try again')
  }
})
export const authTC = createAsyncThunk('login/authTC', async (param, {dispatch, rejectWithValue}) => {

  try {
    const res = await apiLogin.auth()
    dispatch(setUser(res))
    dispatch(setIsLoggedIn({isLoggedIn: true}))
  } catch (e) {
    return rejectWithValue(null)
  } finally {
    dispatch(setIsInitialized({isInitialized: true}))
  }
})

const slice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    user: {} as UserType
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    }
  }
})

export const loginSlice = slice.reducer
export const {setIsLoggedIn, setUser} = slice.actions