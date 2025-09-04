CREATE TABLE categories(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL CHECK (length(name) <= 30), -- !!Check limit in front!! --
  -- type of the category in string --
);

CREATE TABLE article_categories(
  article_id   INT NOT NULL,
  category_id  INT NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
);

CREATE TABLE articles(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL CHECK (length(name) <= 50), -- !!Check limit in front!! --
  thumbnail_path TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
)