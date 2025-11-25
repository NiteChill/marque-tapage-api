PRAGMA foreign_keys = ON;

-- ... users table ...
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

-- categories for the news ...
CREATE TABLE IF NOT EXISTS news_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT UNIQUE NOT NULL
);

-- categories for the favorites ...
CREATE TABLE IF NOT EXISTS favorites_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT UNIQUE NOT NULL
);

-- ... news table ...
CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ... favorites table ...
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT,
    description TEXT,
    price INTEGER,
    note INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ... many to many relationship between news and news_categories ...
CREATE TABLE IF NOT EXISTS news_news_categories (
    news_id INTEGER NOT NULL,
    news_categories_id INTEGER NOT NULL,
    PRIMARY KEY (news_id, news_categories_id),
    FOREIGN KEY (news_id) REFERENCES news (id) ON DELETE CASCADE,
    FOREIGN KEY (news_categories_id) REFERENCES news_categories (id) ON DELETE CASCADE
);

-- ... many to many relationship between favorites and favorites_categories ...
CREATE TABLE IF NOT EXISTS favorites_favorites_categories (
    favorites_id INTEGER NOT NULL,
    favorites_categories_id INTEGER NOT NULL,
    PRIMARY KEY (favorites_id, favorites_categories_id),
    FOREIGN KEY (favorites_id) REFERENCES favorites (id) ON DELETE CASCADE,
    FOREIGN KEY (favorites_categories_id) REFERENCES favorites_categories (id) ON DELETE CASCADE
);
