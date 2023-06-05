import { useDispatch } from 'react-redux';
import { AppThunkDispatchType } from 'store';

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>();