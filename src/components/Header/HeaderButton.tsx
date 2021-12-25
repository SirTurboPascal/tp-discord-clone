import clsx from 'clsx';
import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const StyledHeaderButton = styled.button`
	flex-shrink: 0;

	height: 24px;
	padding: 0 2px;

	background-color: transparent;
	color: #4f5660;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	user-select: none;

	font-size: 16px;

	&:active,
	&:hover {
		color: #2e3337;
	}

	&.withCaption {
		padding: 0 8px;

		overflow: hidden;
		text-overflow: ellipsis;

		font-family: 'Source Sans Pro', sans-serif;
		font-weight: 600;

		white-space: nowrap;

		&:active,
		&:hover {
			background-color: #f4f5f7;
		}
	}

	@media (prefers-color-scheme: dark) {
		color: #b9bbbe;

		&:active,
		&:hover {
			color: #dcddde;
		}

		&.withCaption {
			&:active,
			&:hover {
				background-color: #3b3d43;
			}
		}
	}
`;

const StyledCaption = styled.span``;

interface HeaderButtonProps {
	caption?: string;
	icon?: IconDefinition;

	onClick: () => void;
}

const HeaderButton: FunctionComponent<HeaderButtonProps> = (props) => {
	return (
		<>
			<StyledHeaderButton className={clsx({ withCaption: props.caption })} onClick={props.onClick}>
				{props.icon && (
					<>
						<FontAwesomeIcon icon={props.icon} fixedWidth />
					</>
				)}

				{props.caption && (
					<>
						<StyledCaption>{props.caption}</StyledCaption>
					</>
				)}
			</StyledHeaderButton>
		</>
	);
};

export default HeaderButton;
