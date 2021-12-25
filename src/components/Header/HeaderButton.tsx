import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const StyledHeaderButton = styled.button`
	flex-shrink: 0;

	width: 24px;
	height: 24px;

	background-color: transparent;
	color: #4f5660;
	border: none;
	cursor: pointer;
	user-select: none;

	font-size: 16px;

	&:active,
	&:hover {
		color: #2e3337;
	}

	@media (prefers-color-scheme: dark) {
		color: #b9bbbe;

		&:active,
		&:hover {
			color: #dcddde;
		}
	}
`;

interface HeaderButtonProps {
	icon: IconDefinition;

	onClick: () => void;
}

const HeaderButton: FunctionComponent<HeaderButtonProps> = (props) => {
	return (
		<>
			<StyledHeaderButton onClick={props.onClick}>
				<FontAwesomeIcon icon={props.icon} fixedWidth />
			</StyledHeaderButton>
		</>
	);
};

export default HeaderButton;
