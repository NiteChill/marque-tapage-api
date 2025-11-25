PRAGMA foreign_keys = ON;

-- ... users table ...
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
    cover_image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ... favorites table ...
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT,
    description TEXT,
    price INTEGER CHECK (price >= 0),
    note INTEGER CHECK (note >= 0 AND note <= 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ... many to many relationship between news and news_categories ...
CREATE TABLE IF NOT EXISTS news_news_categories (
    news_id INTEGER NOT NULL,
    news_category_id INTEGER NOT NULL,
    PRIMARY KEY (news_id, news_category_id),
    FOREIGN KEY (news_id) REFERENCES news (id) ON DELETE CASCADE,
    FOREIGN KEY (news_category_id) REFERENCES news_categories (id) ON DELETE CASCADE
);

-- ... many to many relationship between favorites and favorites_categories ...
CREATE TABLE IF NOT EXISTS favorites_favorites_categories (
    favorite_id INTEGER NOT NULL,
    favorite_category_id INTEGER NOT NULL,
    PRIMARY KEY (favorite_id, favorite_category_id),
    FOREIGN KEY (favorite_id) REFERENCES favorites (id) ON DELETE CASCADE,
    FOREIGN KEY (favorite_category_id) REFERENCES favorites_categories (id) ON DELETE CASCADE
);
