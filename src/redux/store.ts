import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {useDispatch} from "react-redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {blogsReducer} from "./blogsReducer";
import {postsReducer} from "./postsReducer";

const rootReducers = combineReducers({
    blogs: blogsReducer,
    posts: postsReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

//hooks
export const AppDispatch = () => useDispatch<AppThunkDispatchType>()

//types
export type ReduxRootType = ReturnType<typeof rootReducers>
export type AppThunkDispatchType = ThunkDispatch<ReduxRootType, any, AnyAction>
export type AppThunkActionType = ThunkAction<void ,ReduxRootType, any, AnyAction>