import styled from 'styled-components';
import { FunctionComponent } from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppStore } from '../hooks';

import { Chat } from '../components/Chat';
import { Header, HeaderButton, HeaderTitle } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const StyledHomePage = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: stretch;

	height: 100vh;

	background-color: #ffffff;
	color: #060607;

	@media (prefers-color-scheme: dark) {
		background-color: #37393f;
		color: #ffffff;
	}
`;

const HomePage: FunctionComponent = () => {
	const { activeUser } = useAppStore((state) => state.user);

	const handleButtonClick = () => {
		alert('Hello World!');
	};

	return (
		<>
			<StyledHomePage>
				<Sidebar>
					<Header>
						<HeaderTitle>Discord Clone</HeaderTitle>

						{activeUser && (
							<>
								<HeaderButton icon={faPlus} onClick={handleButtonClick} />
							</>
						)}
					</Header>
				</Sidebar>

				<Chat>
					<Header>
						<div style={{ flexGrow: 1 }} />

						{!activeUser && (
							<>
								<HeaderButton caption='Log in' onClick={handleButtonClick} />
							</>
						)}
					</Header>
				</Chat>
			</StyledHomePage>
		</>
	);
};

export default HomePage;
