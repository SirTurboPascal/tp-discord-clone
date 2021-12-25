import styled from 'styled-components';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { FunctionComponent, useEffect } from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import IUser from '../interfaces/IUser';
import { setActiveUser } from '../store/slices/userSlice';
import { useAppDispatch, useAppStore } from '../hooks';

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
	const dispatch = useAppDispatch();

	const { activeUser } = useAppStore((state) => state.user);

	const handleButtonClick = () => {
		alert('Hello World!');
	};

	/**
	 * This function triggers a request for authentication on the side of the corresponding
	 * method. In case of an error, it is displayed in a popup.
	 */
	const handleSignInButtonClick = () => {
		signInWithPopup(getAuth(), new GoogleAuthProvider()).catch((error) => {
			alert(error);
		});
	};

	/**
	 * This hook observes the status of authentication and its changes.
	 * If a user is detected, it is written to the global store, otherwise it is removed.
	 */
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			if (!user) {
				dispatch(setActiveUser(undefined));

				return;
			}

			const { displayName, photoURL, uid } = user;
			const activeUser: IUser = {
				uid: uid,
				displayName: displayName ? displayName : undefined,
				photoUrl: photoURL ? photoURL : undefined,
			};

			dispatch(setActiveUser(activeUser));
		});

		return () => unsubscribe();
	}, [dispatch]);

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
								<HeaderButton caption='Log in' onClick={handleSignInButtonClick} />
							</>
						)}
					</Header>
				</Chat>
			</StyledHomePage>
		</>
	);
};

export default HomePage;
