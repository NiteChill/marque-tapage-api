import fs from 'fs';
import path from 'path';
import db from './database';

const sqlPath = path.join(__dirname, 'schema.sql');

try {
	const schema = fs.readFileSync(sqlPath, 'utf-8');

	db.exec(schema);

	console.log('Database successfully initialized!');
} catch (error) {
	console.error('Error executing SQL:', error);
} finally {
	db.close();
}
