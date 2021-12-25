import { useDispatch } from 'react-redux';

import AppDispatch from '../types/AppDispatchType';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
