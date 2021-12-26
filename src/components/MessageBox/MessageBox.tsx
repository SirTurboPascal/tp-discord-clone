import styled from 'styled-components';
import { useFormik } from 'formik';
import { FunctionComponent } from 'react';

import { useAppStore } from '../../hooks';

const StyledMessageBox = styled.footer`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	justify-content: stretch;

	padding: 24px 16px;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;
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
	const { selectedChannel } = useAppStore((state) => state.channel);

	const formik = useFormik({
		initialValues: {
			content: '',
		},

		onSubmit: (values, { resetForm }) => {
			console.log(values);

			resetForm();
		},
	});

	return (
		<>
			<StyledMessageBox>
				<StyledForm onSubmit={formik.handleSubmit}>
					<StyledInput
						name='content'
						onChange={formik.handleChange}
						placeholder={selectedChannel && 'Message #' + selectedChannel.name}
						value={formik.values.content}
					/>
				</StyledForm>
			</StyledMessageBox>
		</>
	);
};

export default MessageBox;
