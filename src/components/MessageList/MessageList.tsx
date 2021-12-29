import styled from 'styled-components';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FunctionComponent, useEffect, useState } from 'react';

import IMessage from '../../interfaces/IMessage';
import { useAppStore } from '../../hooks';

import { MessageListItem } from '.';

const StyledMessageList = styled.ul`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: stretch;

	padding: 32px 8px;

	list-style-type: none;

	& > * {
		margin-bottom: 16px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const MessageList: FunctionComponent = () => {
	const [listMessages, setListMessages] = useState<IMessage[]>([]);
	const { selectedChannel } = useAppStore((state) => state.channel);

	useEffect(() => {
		if (!selectedChannel) {
			return;
		}

		const messagesRef = collection(getFirestore(), 'channels/' + selectedChannel.id + '/messages');

		const unsubscribe = onSnapshot(query(messagesRef, orderBy('timestamp')), (docs) => {
			const snapshot: IMessage[] = [];

			docs.forEach((doc) => {
				const id = doc.id;
				const { content, user } = doc.data();

				snapshot.push({ content, id, user });
			});

			setListMessages(snapshot);
		});

		return () => unsubscribe();
	}, [selectedChannel]);

	return (
		<>
			<StyledMessageList>
				{listMessages.map((message) => (
					<MessageListItem key={message.id} message={message} />
				))}
			</StyledMessageList>
		</>
	);
};

export default MessageList;
