import clsx from 'clsx';
import styled from 'styled-components';
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHashtag, faTrash } from '@fortawesome/free-solid-svg-icons';

import IChannel from '../../interfaces/IChannel';
import { setSelectedChannel } from '../../store/slices/channelSlice';
import { useAppDispatch, useAppStore } from '../../hooks';

const StyledChannelListItem = styled.li`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;

	height: 34px;
	padding: 0 8px;

	color: #6a7480;
	border-radius: 4px;
	cursor: pointer;
	user-select: none;

	&:active,
	&:hover {
		background-color: #e8eaed;
	}

	&.selected {
		background-color: #d3d7db;
	}

	& > * {
		margin-right: 4px;

		&:last-child {
			margin-right: 0;
		}
	}

	@media (prefers-color-scheme: dark) {
		color: #8e9296;

		&:active,
		&:hover {
			background-color: #34363d;
		}

		&.selected {
			background-color: #3a3c43;
		}
	}
`;

const StyledButton = styled.button`
	flex-shrink: 0;

	display: none;
	width: 20px;
	height: 20px;

	background-color: transparent;
	color: #4f5660;
	border: none;
	cursor: pointer;
	user-select: none;

	&:active,
	&:hover {
		color: #2d3236;
	}

	${StyledChannelListItem}:active > &,
    ${StyledChannelListItem}:hover > &,
    ${StyledChannelListItem}.selected > & {
		display: block;
	}

	@media (prefers-color-scheme: dark) {
		color: #b9bbbe;

		&:active,
		&:hover {
			color: #d7d8d9;
		}
	}
`;

const StyledName = styled.h6`
	flex-grow: 1;

	overflow: hidden;
	text-overflow: ellipsis;

	font-size: 16px;
	font-weight: 600;

	white-space: nowrap;

	${StyledChannelListItem}:active > &,
    ${StyledChannelListItem}:hover > & {
		color: #2e3337;
	}

	${StyledChannelListItem}.selected > & {
		color: #060607;
	}

	@media (prefers-color-scheme: dark) {
		${StyledChannelListItem}:active > &,
        ${StyledChannelListItem}:hover > & {
			color: #dcddde;
		}

		${StyledChannelListItem}.selected > & {
			color: #ffffff;
		}
	}
`;

interface ChannelListItemProps {
	channel: IChannel;
}

const ChannelListItem: FunctionComponent<ChannelListItemProps> = (props) => {
	const dispatch = useAppDispatch();

	const { activeUser } = useAppStore((state) => state.user);
	const { selectedChannel } = useAppStore((state) => state.channel);

	const handleChannelListItemClick = (channel: IChannel) => {
		dispatch(setSelectedChannel(channel));
	};

	const handleDeleteButtonClick = (id: string) => {
		if (!window.confirm('Do you want to delete this channel and all messages in it? This can not be undone!')) {
			return;
		}

		deleteDoc(doc(getFirestore(), 'channels/' + id)).catch((error) => {
			alert(error);
		});
	};

	const handleUpdateButtonClick = (channel: IChannel) => {
		const newChannelName = prompt('Please enter a new name for this channel.', channel.name);
		if (!newChannelName) {
			return;
		}

		updateDoc(doc(getFirestore(), 'channels/' + channel.id), {
			name: newChannelName.toLowerCase().replaceAll(' ', '-'),
		}).catch((error) => alert(error));
	};

	return (
		<>
			<StyledChannelListItem
				className={clsx({ selected: selectedChannel && selectedChannel.id === props.channel.id })}
				onClick={() => handleChannelListItemClick(props.channel)}
			>
				<FontAwesomeIcon icon={faHashtag} fixedWidth />
				<StyledName>{props.channel.name}</StyledName>

				{activeUser && props.channel.user.uid === activeUser.uid && (
					<>
						<StyledButton onClick={() => handleUpdateButtonClick(props.channel)}>
							<FontAwesomeIcon icon={faEdit} fixedWidth />
						</StyledButton>

						<StyledButton onClick={() => handleDeleteButtonClick(props.channel.id)}>
							<FontAwesomeIcon icon={faTrash} fixedWidth />
						</StyledButton>
					</>
				)}
			</StyledChannelListItem>
		</>
	);
};

export default ChannelListItem;
