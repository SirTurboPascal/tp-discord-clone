import styled from 'styled-components';
import { FunctionComponent } from 'react';

const StyledSidebar = styled.aside`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	justify-content: stretch;

	width: 240px;

	background-color: #f2f3f5;

	@media (prefers-color-scheme: dark) {
		background-color: #2f3136;
	}
`;

const Sidebar: FunctionComponent = (props) => {
	return (
		<>
			<StyledSidebar>{props.children}</StyledSidebar>
		</>
	);
};

export default Sidebar;
