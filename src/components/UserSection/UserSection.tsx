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

interface UserSectionProps {
	user: IUser;
}

const UserSection: FunctionComponent<UserSectionProps> = (props) => {
	return (
		<>
			<StyledUserSection>
				<Avatar photoUrl={props.user.photoUrl} />
				<div style={{ flexGrow: 1 }} />

				{props.children}
			</StyledUserSection>
		</>
	);
};

export default UserSection;
