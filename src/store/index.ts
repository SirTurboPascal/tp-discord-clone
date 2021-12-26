import { configureStore } from '@reduxjs/toolkit';

import channelSlice from './slices/channelSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
	reducer: {
		channel: channelSlice,
		user: userSlice,
	},
});

export default store;
