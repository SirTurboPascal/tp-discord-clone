import styled from 'styled-components';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh, faTrash } from '@fortawesome/free-solid-svg-icons';

import IMessage from '../../interfaces/IMessage';
import { useAppStore } from '../../hooks';

import { Avatar } from '../Avatar';

const StyledMessageListItem = styled.li`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: flex-start;

	position: relative;
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

const StyledButton = styled.button`
	flex-shrink: 0;

	width: 32px;
	height: 32px;

	background-color: transparent;
	color: #505660;
	border: none;
	cursor: pointer;
	user-select: none;

	font-size: 14px;

	&:active,
	&:hover {
		background-color: #eaeaeb;
		color: #2d3236;
	}

	@media (prefers-color-scheme: dark) {
		color: #b9bbbe;

		&:active,
		&:hover {
			background-color: #3b3d44;
			color: #dcddde;
		}
	}
`;

const StyledButtonList = styled.section`
	display: none;
	flex-direction: row;
	align-items: center;

	position: absolute;
	top: -16px;
	right: 8px;

	background-color: #ffffff;
	border: 1px solid #dededf;
	border-radius: 4px;
	overflow: hidden;

	transition: all 125ms ease-in-out;

	&:active,
	&:hover {
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
	}

	${StyledMessageListItem}:hover & {
		display: flex;
	}

	@media (prefers-color-scheme: dark) {
		background-color: #37393f;
		border-color: #292b2e;
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
	const { content, id, user } = message;
	const { displayName, uid } = user;

	const { activeUser } = useAppStore((state) => state.user);
	const { selectedChannel } = useAppStore((state) => state.channel);

	const handleButtonClick = () => {
		alert('Hello World!');
	};

	const handleDeleteButtonClick = (id: string) => {
		if (!selectedChannel) {
			return;
		}

		if (!window.confirm('Do you want to delete this message? This can not be undone!')) {
			return;
		}

		deleteDoc(doc(getFirestore(), 'channels/' + selectedChannel.id + '/messages/' + id)).catch((error) => {
			alert(error);
		});
	};

	return (
		<>
			<StyledMessageListItem>
				<Avatar photoUrl={props.message.user.photoUrl} />

				<StyledMessage>
					<h4>{displayName ? displayName : uid}</h4>
					<StyledContent>{content}</StyledContent>

					<StyledButtonList>
						<StyledButton onClick={handleButtonClick}>
							<FontAwesomeIcon icon={faLaugh} fixedWidth />
						</StyledButton>

						{activeUser && activeUser.uid === user.uid && (
							<>
								<StyledButton onClick={() => handleDeleteButtonClick(id)} style={{ color: '#ed4245' }}>
									<FontAwesomeIcon icon={faTrash} fixedWidth />
								</StyledButton>
							</>
						)}
					</StyledButtonList>
				</StyledMessage>
			</StyledMessageListItem>
		</>
	);
};

export default MessageListItem;
