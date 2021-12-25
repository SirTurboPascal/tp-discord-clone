import styled from 'styled-components';
import { FunctionComponent } from 'react';

const StyledHeader = styled.header`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;

	height: 48px;
	padding: 0 16px;

	border-bottom: 1px solid #d0d1d3;

	& > * {
		margin-right: 4px;

		&:last-child {
			margin-right: 0;
		}
	}

	@media (prefers-color-scheme: dark) {
		border-bottom-color: #232428;
	}
`;

const Header: FunctionComponent = (props) => {
	return (
		<>
			<StyledHeader>{props.children}</StyledHeader>
		</>
	);
};

export default Header;
