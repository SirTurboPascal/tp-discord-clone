import styled from 'styled-components';
import { FunctionComponent } from 'react';

import IUser from '../../interfaces/IUser';

import { Avatar } from '../Avatar';

const StyledUserSection = styled.footer`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;

	height: 52px;
	padding: 0 8px;

	background-color: #ebedef;

	& > * {
		margin-right: 4px;

		&:last-child {
			margin-right: 0;
		}
	}

	@media (prefers-color-scheme: dark) {
		background-color: #292b2f;
	}
`;

const StyledUserContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: stretch;

	margin-left: 4px;

	overflow: hidden;
	cursor: default;
	user-select: none;
`;

const StyledUserId = styled.span`
	color: #4f5660;
	overflow: hidden;
	text-overflow: ellipsis;

	font-size: 12px;
	font-weight: 600;

	line-height: 12px;
	white-space: nowrap;

	@media (prefers-color-scheme: dark) {
		color: #babbbe;
	}
`;

const StyledUserName = styled.h4`
	overflow: hidden;
	text-overflow: ellipsis;

	font-size: 14px;
	font-weight: 700;

	line-height: 14px;
	white-space: nowrap;
`;

interface UserSectionProps {
	user: IUser;
}

const UserSection: FunctionComponent<UserSectionProps> = (props) => {
	return (
		<>
			<StyledUserSection>
				<Avatar photoUrl={props.user.photoUrl} />

				<StyledUserContainer>
					{props.user.displayName && (
						<>
							<StyledUserName>{props.user.displayName}</StyledUserName>
						</>
					)}

					<StyledUserId>#{props.user.uid}</StyledUserId>
				</StyledUserContainer>

				{props.children}
			</StyledUserSection>
		</>
	);
};

export default UserSection;
