import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {blogsReducer} from "features/Blogs/blogsSlice";
import {postsReducer} from "features/Posts/postsSlice";
import {loginReducer} from "features/Login/loginSlice";
import {appReducer} from "app/appSlice";

const rootReducers = combineReducers({
    blogs: blogsReducer,
    posts: postsReducer,
    login: loginReducer,
    app : appReducer
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