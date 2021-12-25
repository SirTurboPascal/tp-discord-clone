import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import IUser from '../../interfaces/IUser';
import IUserSliceState from '../../interfaces/IUserSliceState';

const initialState: IUserSliceState = {};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,

	reducers: {
		setActiveUser: (state, action: PayloadAction<IUser | undefined>) => {
			state.activeUser = action.payload;
		},
	},
});

export default userSlice.reducer;
export const { setActiveUser } = userSlice.actions;
