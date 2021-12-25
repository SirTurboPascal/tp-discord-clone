import styled from 'styled-components';
import { FunctionComponent } from 'react';

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

const HomePage: FunctionComponent = (props) => {
	return (
		<>
			<StyledHomePage>
				<h1>Discord Clone</h1>
			</StyledHomePage>
		</>
	);
};

export default HomePage;
