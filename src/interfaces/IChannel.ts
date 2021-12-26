import IUser from './IUser';

interface IChannel {
	id: string;
	name: string;

	user: IUser;
}

export default IChannel;
