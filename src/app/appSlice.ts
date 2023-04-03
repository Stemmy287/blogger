import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false
  },
  reducers: {
    setIsInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})