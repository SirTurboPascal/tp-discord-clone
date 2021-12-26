import clsx from 'clsx';
import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

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

	const { selectedChannel } = useAppStore((state) => state.channel);

	const handleChannelListItemClick = (channel: IChannel) => {
		dispatch(setSelectedChannel(channel));
	};

	return (
		<>
			<StyledChannelListItem
				className={clsx({ selected: selectedChannel && selectedChannel.id === props.channel.id })}
				onClick={() => handleChannelListItemClick(props.channel)}
			>
				<FontAwesomeIcon icon={faHashtag} fixedWidth />

				<StyledName>{props.channel.name}</StyledName>
			</StyledChannelListItem>
		</>
	);
};

export default ChannelListItem;
