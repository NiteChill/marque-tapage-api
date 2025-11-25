import { User } from '../models/users.model';

export const isUser = (user: unknown): user is User => {
	return (
		user !== null &&
		typeof user === 'object' &&
		'id' in user &&
		'username' in user &&
		'password_hash' in user &&
		'created_at' in user &&
		typeof (user as User).id === 'number' &&
		typeof (user as User).username === 'string' &&
		typeof (user as User).password_hash === 'string' &&
		typeof (user as User).created_at === 'string'
	);
};
