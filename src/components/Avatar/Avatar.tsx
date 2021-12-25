import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const StyledAvatar = styled.div`
	flex-shrink: 0;

	display: grid;
	position: relative;
	width: 32px;
	height: 32px;

	background-color: #5765f2;
	border-radius: 50%;
	overflow: hidden;
	user-select: none;

	font-size: 18px;

	& > img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

interface AvatarProps {
	photoUrl?: string;
}

const Avatar: FunctionComponent<AvatarProps> = (props) => {
	return (
		<>
			<StyledAvatar>
				<FontAwesomeIcon icon={faComment} style={{ margin: 'auto' }} fixedWidth />

				{props.photoUrl && (
					<>
						<img alt={props.photoUrl} src={props.photoUrl} />
					</>
				)}
			</StyledAvatar>
		</>
	);
};

export default Avatar;
