import styled from 'styled-components';
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import { useFormik } from 'formik';
import { FunctionComponent, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { useAppStore } from '../../hooks';

const StyledMessageBox = styled.footer`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	justify-content: stretch;

	padding: 24px 16px;
`;

const StyledButton = styled.button`
	flex-shrink: 0;

	width: 44px;
	height: 44px;

	background-color: #ebedef;
	color: #4f5660;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	user-select: none;

	font-size: 18px;

	&:active,
	&:hover {
		color: #2e3337;
	}

	@media (prefers-color-scheme: dark) {
		background-color: #40444b;
		color: #b9bbbe;

		&:active,
		&:hover {
			color: #dcddde;
		}
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;

	& > * {
		margin-right: 8px;

		&:last-child {
			margin-right: 0;
		}
	}
`;

const StyledInput = styled.input`
	flex-grow: 1;

	height: 44px;
	padding: 0 16px;

	background-color: #ebedef;
	color: #2e3337;
	border: none;
	outline: none;
	border-radius: 8px;

	font-family: 'Source Sans Pro', sans-serif;
	font-size: 16px;

	@media (prefers-color-scheme: dark) {
		background-color: #40444b;
		color: #dcddde;
	}
`;

const MessageBox: FunctionComponent = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const { activeUser } = useAppStore((state) => state.user);
	const { selectedChannel } = useAppStore((state) => state.channel);

	const formik = useFormik({
		initialValues: {
			content: '',
		},

		onSubmit: (values, { resetForm }) => {
			if (!selectedChannel) {
				return;
			}

			addDoc(collection(getFirestore(), 'channels/' + selectedChannel.id + '/messages'), {
				content: values.content,
				timestamp: Timestamp.fromDate(new Date()),

				user: activeUser,
			}).catch((error) => alert(error));

			resetForm();
		},
	});

	useEffect(() => {
		if (!selectedChannel || !inputRef.current) {
			return;
		}

		inputRef.current.focus();
	}, [selectedChannel]);

	return (
		<>
			<StyledMessageBox>
				<StyledForm onSubmit={formik.handleSubmit}>
					<StyledInput
						name='content'
						onChange={formik.handleChange}
						placeholder={selectedChannel && 'Message #' + selectedChannel.name}
						ref={inputRef}
						value={formik.values.content}
					/>

					<StyledButton type='submit'>
						<FontAwesomeIcon icon={faPaperPlane} fixedWidth />
					</StyledButton>
				</StyledForm>
			</StyledMessageBox>
		</>
	);
};

export default MessageBox;
