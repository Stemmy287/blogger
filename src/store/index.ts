import { AnyAction, combineReducers } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { blogsReducer } from 'modules/blogsModule';
import { postsReducer } from 'modules/postsModule';
import { authReducer } from 'modules/authModule';
import { appReducer } from 'app/appSlice';
import { commentsReducer } from 'modules/commentsModule';

const rootReducer = combineReducers({
	app: appReducer,
	blogs: blogsReducer,
	posts: postsReducer,
	auth: authReducer,
	comments: commentsReducer,
});

export const index = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

//types
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, void, AnyAction>;