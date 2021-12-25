import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const StyledUserSectionButton = styled.button`
	flex-shrink: 0;

	width: 32px;
	height: 32px;

	background-color: transparent;
	color: #505660;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	user-select: none;

	font-size: 18px;

	&:active,
	&:hover {
		background-color: #c8ccd2;
		color: #2e3337;
	}

	@media (prefers-color-scheme: dark) {
		color: #b9bbbe;

		&:active,
		&:hover {
			background-color: #34363a;
			color: #dcddde;
		}
	}
`;

interface UserSectionButtonProps {
	icon: IconDefinition;

	onClick: () => void;
}

const UserSectionButton: FunctionComponent<UserSectionButtonProps> = (props) => {
	return (
		<>
			<StyledUserSectionButton onClick={props.onClick}>
				<FontAwesomeIcon icon={props.icon} fixedWidth />
			</StyledUserSectionButton>
		</>
	);
};

export default UserSectionButton;
