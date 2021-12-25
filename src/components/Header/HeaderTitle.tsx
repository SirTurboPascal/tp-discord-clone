import styled from 'styled-components';
import { FunctionComponent } from 'react';

const StyledHeaderTitle = styled.h4`
	flex-grow: 1;

	overflow: hidden;
	text-overflow: ellipsis;
	cursor: default;
	user-select: none;

	font-size: 16px;
	font-weight: 700;

	white-space: nowrap;
`;

const HeaderTitle: FunctionComponent = (props) => {
	return (
		<>
			<StyledHeaderTitle>{props.children}</StyledHeaderTitle>
		</>
	);
};

export default HeaderTitle;
