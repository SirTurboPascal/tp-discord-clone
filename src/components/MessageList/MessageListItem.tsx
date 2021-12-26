import styled from 'styled-components';
import { FunctionComponent } from 'react';

import IMessage from '../../interfaces/IMessage';

import { Avatar } from '../Avatar';

const StyledMessageListItem = styled.li``;

interface MessageListItemProps {
	message: IMessage;
}

const MessageListItem: FunctionComponent<MessageListItemProps> = (props) => {
	return (
		<>
			<StyledMessageListItem>
				<Avatar photoUrl={props.message.user.photoUrl} />
			</StyledMessageListItem>
		</>
	);
};

export default MessageListItem;
