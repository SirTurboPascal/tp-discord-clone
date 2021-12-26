import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const StyledHeaderIcon = styled.div`
	flex-shrink: 0;

	color: #747f8d;

	font-size: 20px;

	@media (prefers-color-scheme: dark) {
		color: #72767d;
	}
`;

interface HeaderIconProps {
	icon: IconDefinition;
}

const HeaderIcon: FunctionComponent<HeaderIconProps> = (props) => {
	return (
		<>
			<StyledHeaderIcon>
				<FontAwesomeIcon icon={props.icon} fixedWidth />
			</StyledHeaderIcon>
		</>
	);
};

export default HeaderIcon;
