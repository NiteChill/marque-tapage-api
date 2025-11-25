import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, 'database.db'), {
	verbose: console.log,
});

db.pragma('journal_mode = WAL');

export default db;
