import {Header} from "app/Header/Header";
import {Pages} from "app/Pages/Pages";
import React, {useEffect} from "react";
import {useAppDispatch} from "hooks/useAppDispatch";
import {authTC} from "features/Login/loginSlice";
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

  return (
    <div>
      <Header/>
      <Pages/>
    </div>
  );
}


