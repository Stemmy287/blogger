import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {blogsReducer} from "features/Blogs/blogsSlice";
import {postsReducer} from "features/Posts/postsSlice";
import {authReducer} from "features/Auth/authSlice";
import {appReducer} from "app/appSlice";
import {commentsReducer} from "features/Comments/commentsSlice";

const rootReducers = combineReducers({
    app : appReducer,
    blogs: blogsReducer,
    posts: postsReducer,
    auth: authReducer,
    comments: commentsReducer
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