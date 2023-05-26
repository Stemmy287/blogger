import {useDispatch} from "react-redux";
import {AppThunkDispatchType} from "store/store";

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()