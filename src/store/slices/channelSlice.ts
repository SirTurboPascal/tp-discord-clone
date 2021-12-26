import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import IChannel from '../../interfaces/IChannel';
import IChannelSliceState from '../../interfaces/IChannelSliceState';

const initialState: IChannelSliceState = {};

const channelSlice = createSlice({
	name: 'channel',
	initialState: initialState,

	reducers: {
		setSelectedChannel: (state, action: PayloadAction<IChannel | undefined>) => {
			state.selectedChannel = action.payload;
		},
	},
});

export default channelSlice.reducer;
export const { setSelectedChannel } = channelSlice.actions;
