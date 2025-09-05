CREATE TABLE articles (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL CHECK (length(title) <= 50),
  thumbnail_path TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL CHECK (length(label) <= 30),
  category_type TEXT NOT NULL CHECK (category_type IN ('news', 'favorites'))
);

CREATE TABLE article_categories (
  article_id  INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  id INTEGER NOT NULL PRIMARY KEY,
  price REAL NOT NULL,
  rating REAL NOT NULL CHECK (rating BETWEEN 0 AND 5),
  FOREIGN KEY (id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE TABLE news (
  id INTEGER NOT NULL PRIMARY KEY,
  FOREIGN KEY (id) REFERENCES articles(id) ON DELETE CASCADE
);


--- Dummy Data ---
-- articles --
INSERT INTO articles (title, thumbnail_path, content) VALUES
('The Future of AI is Here', '/assets/images/ai-thumb.jpg', 'A comprehensive look into the latest advancements in artificial intelligence.'),
('Summer Travel Destinations', '/assets/images/travel-thumb.jpg', 'Exploring the most beautiful places to visit this summer.'),
('Delicious Italian Pasta Recipe', '/assets/images/pasta-thumb.jpg', 'An authentic guide to making a classic pasta carbonara from scratch.'),
('Local Basketball Team Wins Championship', '/assets/images/sports-thumb.jpg', 'The Grizzlies take home the gold in a nail-biting final match.'),
('Top 5 Gadgets of the Year', '/assets/images/gadget-thumb.jpg', 'Reviewing the must-have tech gadgets of 2024.');

-- categories --
INSERT INTO categories (label, category_type) VALUES
('tech', 'news'),
('travel', 'favorites'),
('food', 'favorites'),
('sports', 'news'),
('lifestyle', 'favorites');

-- favorites --
INSERT INTO favorites (id, price, rating) VALUES
(2, 99.99, 4.5),
(3, 15.50, 4.9),
(5, 299.00, 4.7);

-- news --
INSERT INTO news (id) VALUES
(1),
(4);

-- article_categories --
-- Article 1 (News: The Future of AI) -> Categories: 'tech' (id=1)
INSERT INTO article_categories (article_id, category_id) VALUES (1, 1);
-- Article 2 (Favorites: Summer Travel) -> Categories: 'travel' (id=2), 'lifestyle' (id=5)
INSERT INTO article_categories (article_id, category_id) VALUES (2, 2), (2, 5);
-- Article 3 (Favorites: Pasta) -> Categories: 'food' (id=3), 'lifestyle' (id=5)
INSERT INTO article_categories (article_id, category_id) VALUES (3, 3), (3, 5);
-- Article 4 (News: Basketball) -> Categories: 'sports' (id=4)
INSERT INTO article_categories (article_id, category_id) VALUES (4, 4);
-- Article 5 (Favorites: Gadgets) -> Categories: 'travel' (id=2), 'lifestyle' (id=5)
INSERT INTO article_categories (article_id, category_id) VALUES (5, 2), (5, 5);