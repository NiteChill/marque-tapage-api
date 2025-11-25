import { User } from '../models/users.model';

/**
 * Check if the given object is a User
 * @param   {unknown} user The object to check
 * @returns {boolean} true if the object is a User, false otherwise
 */
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
