import styled from 'styled-components';
import { FunctionComponent } from 'react';

const StyledChat = styled.main`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: stretch;
`;

const Chat: FunctionComponent = (props) => {
	return (
		<>
			<StyledChat>{props.children}</StyledChat>
		</>
	);
};

export default Chat;
