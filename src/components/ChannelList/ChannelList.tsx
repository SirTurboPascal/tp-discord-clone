import styled from 'styled-components';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FunctionComponent, useEffect, useState } from 'react';

import IChannel from '../../interfaces/IChannel';
import { setSelectedChannel } from '../../store/slices/channelSlice';
import { useAppDispatch } from '../../hooks';

import { ChannelListItem } from '.';

const StyledChannelList = styled.ul`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: stretch;

	padding: 12px 8px;

	overflow-y: auto;

	& > * {
		margin-bottom: 2px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const ChannelList: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	const [listChannels, setListChannels] = useState<IChannel[]>([]);

	useEffect(() => {
		const channelsRef = collection(getFirestore(), 'channels');

		const unsubscribe = onSnapshot(query(channelsRef, orderBy('timestamp')), (docs) => {
			const snapshot: IChannel[] = [];

			docs.docChanges().forEach((docChange) => {
				if (docChange.type === 'removed') {
					dispatch(setSelectedChannel(undefined));
				}
			});

			docs.forEach((doc) => {
				const id = doc.id;
				const { name, user } = doc.data();

				snapshot.push({ id, name, user });
			});

			setListChannels(snapshot);
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<>
			<StyledChannelList>
				{listChannels.map((channel) => (
					<ChannelListItem key={channel.id} channel={channel} />
				))}
			</StyledChannelList>
		</>
	);
};

export default ChannelList;
