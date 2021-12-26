import styled from 'styled-components';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FunctionComponent, useEffect, useState } from 'react';

import IChannel from '../../interfaces/IChannel';

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
	const [listChannels, setListChannels] = useState<IChannel[]>([]);

	/**
	 * This hook observes changes in the collection of channels in
	 * the database, including basic CRUD operations.
	 */
	useEffect(() => {
		const channelsRef = collection(getFirestore(), 'channels');

		const unsubscribe = onSnapshot(query(channelsRef, orderBy('timestamp')), (docs) => {
			const snapshot: IChannel[] = [];

			docs.forEach((doc) => {
				const id = doc.id;
				const { name, user } = doc.data();

				snapshot.push({ id, name, user });
			});

			setListChannels(snapshot);
		});

		return () => unsubscribe();
	}, []);

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
