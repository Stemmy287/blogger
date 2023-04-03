import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {blogsSlice} from "features/Blogs/blogsSlice";
import {postsSlice} from "features/Posts/postsSlice";
import {loginSlice} from "features/Login/loginSlice";

const rootReducers = combineReducers({
    blogs: blogsSlice,
    posts: postsSlice,
    login: loginSlice
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

//types
export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

// @ts-ignore
window.store = store;