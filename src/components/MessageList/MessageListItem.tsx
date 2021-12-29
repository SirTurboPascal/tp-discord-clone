import styled from 'styled-components';
import { FunctionComponent } from 'react';

import IMessage from '../../interfaces/IMessage';

import { Avatar } from '../Avatar';

const StyledMessageListItem = styled.li`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: flex-start;

	padding: 4px 8px;

	border-radius: 4px;

	&:hover {
		background-color: #fafafb;
	}

	& > * {
		margin-right: 16px;

		&:last-child {
			margin-right: 0;
		}
	}

	& > .avatar {
		width: 40px;
		height: 40px;
	}

	@media (prefers-color-scheme: dark) {
		&:hover {
			background-color: #33353a;
		}
	}
`;

const StyledContent = styled.p`
	flex-shrink: 0;

	color: #2e3337;

	@media (prefers-color-scheme: dark) {
		color: #dcddde;
	}
`;

const StyledMessage = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: stretch;
`;

interface MessageListItemProps {
	message: IMessage;
}

const MessageListItem: FunctionComponent<MessageListItemProps> = (props) => {
	const { message } = props;
	const { content, user } = message;
	const { displayName, uid } = user;

	return (
		<>
			<StyledMessageListItem>
				<Avatar photoUrl={props.message.user.photoUrl} />

				<StyledMessage>
					<h4>{displayName ? displayName : uid}</h4>

					<StyledContent>{content}</StyledContent>
				</StyledMessage>
			</StyledMessageListItem>
		</>
	);
};

export default MessageListItem;
