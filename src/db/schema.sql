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

-- ... users table insertion ...
INSERT INTO users (username, password_hash) VALUES
('Laurence', '$2a$12$Qr7NQmTQmJJP7hCrUHm41.BsWSB5S5S8GGwThKe.brYsebMeduXqW'); -- pw : Odilou 09 | rounds : 12

-- ... news_categories table insertion ...
INSERT INTO news_categories (label) VALUES
('Announcements'),
('Events'),
('Promotions');

-- ... favorites_categories table insertion ...
INSERT INTO favorites_categories (label) VALUES
('Sci-Fi'),
('Fantasy'),
('Technical');

-- ... news table insertion ...
INSERT INTO news (title, content) VALUES
('Grand Opening Next Week!', 'We are thrilled to announce that our bookshop will officially open its doors on Monday. Come join us for coffee and books!'),
('Meet the Author: John Doe', 'This Saturday at 2 PM, local author John Doe will be signing copies of his latest mystery novel. Don''t miss it!'),
('Summer Sale Begins', 'Get 20% off on all hardcovers starting today until the end of the month. It is the perfect time to stock up on beach reads.');

-- ... favorites table insertion ...
INSERT INTO favorites (title, author, cover_image, description, price, note) VALUES
('Dune', 'Frank Herbert', 'https://placehold.co/400x600/png?text=Dune', 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.', 25, 5),

('The Hobbit', 'J.R.R. Tolkien', 'https://placehold.co/400x600/png?text=Hobbit', 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling further than the pantry of his hobbit-hole in Bag End.', 18, 4),

('The Pragmatic Programmer', 'David Thomas & Andrew Hunt', 'https://placehold.co/400x600/png?text=Code', 'The Pragmatic Programmer is one of those rare tech books you’ll read, re-read, and read again over the years. Whether you’re new to the field or an experienced practitioner, you’ll come away with fresh insights.', 45, 5);

-- ... news_news_categories table insertion ...
INSERT INTO news_news_categories (news_id, news_category_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);

-- ... favorites_favorites_categories table insertion ...
INSERT INTO favorites_favorites_categories (favorite_id, favorite_category_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);
