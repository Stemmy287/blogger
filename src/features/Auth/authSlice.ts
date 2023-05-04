import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiAuth, LoginType, RegistrationDataType, UserType} from "features/Auth/authApi";
import {setIsInitialized} from "app/appSlice";

export const loginTC = createAsyncThunk('auth/loginTC', async (param: LoginType, {dispatch, rejectWithValue}) => {

  try {
    const res = await apiAuth.login(param)
    localStorage.setItem('accessToken', res.accessToken)
    dispatch(authTC())
  } catch (e) {
    return rejectWithValue('The password or email or Username is incorrect. Please try again')
  }
  
})
export const authTC = createAsyncThunk('auth/authTC', async (param, {dispatch, rejectWithValue}) => {

  try {
    const res = await apiAuth.auth()
    dispatch(setUser(res))
    dispatch(setIsLoggedIn({isLoggedIn: true}))
  } catch (e) {
    return rejectWithValue(null)
  } finally {
    dispatch(setIsInitialized({isInitialized: true}))
  }

})
export const registrationTC = createAsyncThunk('auth/registrationTC', async (param: RegistrationDataType, {rejectWithValue}) => {

  try {
    await apiAuth.registration(param)
  } catch (e) {
    return  rejectWithValue(null)
  }

})

const slice = createSlice({
  name: 'auth',
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

export const authReducer = slice.reducer
export const {setIsLoggedIn, setUser} = slice.actions