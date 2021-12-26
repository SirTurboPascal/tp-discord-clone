import IUser from './IUser';

interface IMessage {
	content: string;
	id: string;

	user: IUser;
}

export default IMessage;
