import { TypedUseSelectorHook, useSelector } from 'react-redux';

import AppStoreType from '../types/AppStoreType';

const useAppStore: TypedUseSelectorHook<AppStoreType> = useSelector;

export default useAppStore;
