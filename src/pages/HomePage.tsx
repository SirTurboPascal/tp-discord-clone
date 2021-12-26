import styled from 'styled-components';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import { FunctionComponent, useEffect } from 'react';

import {
	faBell,
	faCog,
	faHashtag,
	faInbox,
	faPlus,
	faQuestionCircle,
	faSignOutAlt,
	faThumbtack,
	faUserFriends,
} from '@fortawesome/free-solid-svg-icons';

import IUser from '../interfaces/IUser';
import { setSelectedChannel } from '../store/slices/channelSlice';
import { setActiveUser } from '../store/slices/userSlice';
import { useAppDispatch, useAppStore } from '../hooks';

import { ChannelList } from '../components/ChannelList';
import { Chat } from '../components/Chat';
import { Header, HeaderButton, HeaderIcon, HeaderTitle } from '../components/Header';
import { MessageBox } from '../components/MessageBox';
import { MessageList } from '../components/MessageList';
import { Sidebar } from '../components/Sidebar';
import { UserSection, UserSectionButton } from '../components/UserSection';

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
	const { selectedChannel } = useAppStore((state) => state.channel);

	const handleButtonClick = () => {
		alert('Hello World!');
	};

	const handleAddButtonClick = () => {
		if (!activeUser) {
			return;
		}

		const newChannelName = prompt('Please enter a name for the new channel.', 'new-channel');
		if (!newChannelName) {
			return;
		}

		addDoc(collection(getFirestore(), 'channels'), {
			name: newChannelName.toLowerCase().replaceAll(' ', '-'),
			timestamp: Timestamp.fromDate(new Date()),

			user: activeUser,
		}).catch((error) => alert(error));
	};

	const handleSignInButtonClick = () => {
		signInWithPopup(getAuth(), new GoogleAuthProvider()).catch((error) => {
			alert(error);
		});
	};

	const handleSignOutButtonClick = () => {
		if (!window.confirm('Are you sure you want to sign out?')) {
			return;
		}

		signOut(getAuth()).catch((error) => {
			alert(error);
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			if (!user) {
				dispatch(setActiveUser(undefined));
				dispatch(setSelectedChannel(undefined));

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
								<HeaderButton icon={faPlus} onClick={handleAddButtonClick} />
							</>
						)}
					</Header>

					{activeUser && (
						<>
							<ChannelList />

							<UserSection user={activeUser}>
								<UserSectionButton icon={faCog} onClick={handleButtonClick} />
								<UserSectionButton icon={faSignOutAlt} onClick={handleSignOutButtonClick} />
							</UserSection>
						</>
					)}
				</Sidebar>

				<Chat>
					<Header>
						{selectedChannel ? (
							<>
								<HeaderIcon icon={faHashtag} />

								<HeaderTitle>{selectedChannel.name}</HeaderTitle>
							</>
						) : (
							<>
								<div style={{ flexGrow: 1 }} />
							</>
						)}

						{activeUser ? (
							<>
								<HeaderButton icon={faHashtag} onClick={handleButtonClick} />
								<HeaderButton icon={faBell} onClick={handleButtonClick} />
								<HeaderButton icon={faThumbtack} onClick={handleButtonClick} />
								<HeaderButton icon={faUserFriends} onClick={handleButtonClick} />
								<HeaderButton icon={faInbox} onClick={handleButtonClick} />
								<HeaderButton icon={faQuestionCircle} onClick={handleButtonClick} />
							</>
						) : (
							<>
								<HeaderButton caption='Log in' onClick={handleSignInButtonClick} />
							</>
						)}
					</Header>

					{activeUser && selectedChannel && (
						<>
							<MessageList />
							<MessageBox />
						</>
					)}
				</Chat>
			</StyledHomePage>
		</>
	);
};

export default HomePage;
