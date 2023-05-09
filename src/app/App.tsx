import {Pages} from "app/Pages/Pages";
import React, {useEffect} from "react";
import {useAppDispatch} from "hooks/useAppDispatch";
import {authTC} from "features/Auth/authSlice";
import {useAppSelector} from "hooks/useAppSelector";
import {isInitializedSelector} from "app/appSelectors";

export function App() {

  const dispatch = useAppDispatch()

  const isInitialized = useAppSelector(isInitializedSelector)

  useEffect(() => {
    dispatch(authTC())
  }, [])

  if (!isInitialized) {
    return <div>...loading</div>
  }

  return <Pages/>
}


