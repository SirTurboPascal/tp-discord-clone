import store from '../store';

type AppStoreType = ReturnType<typeof store.getState>;

export default AppStoreType;
