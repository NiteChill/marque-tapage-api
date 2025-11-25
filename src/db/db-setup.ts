import fs from 'fs';
import path from 'path';
import db from './database';

const sqlPath = path.join(__dirname, 'schema.sql');
const dummyDataPath = path.join(__dirname, 'dummy-data.sql');

try {
	const schema = fs.readFileSync(sqlPath, 'utf-8');
	const dummyData = fs.readFileSync(dummyDataPath, 'utf-8');

	db.exec(schema);
	db.exec(dummyData);

	console.log('Database successfully initialized!');
} catch (error) {
	console.error('Error executing SQL:', error);
} finally {
	db.close();
}
