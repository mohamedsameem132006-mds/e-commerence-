CREATE TABLE IF NOT EXISTS users (
  uid VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_uid VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  product_data JSON,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_uid) REFERENCES users(uid) ON DELETE CASCADE,
  UNIQUE KEY unique_cart_item (user_uid, product_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_uid VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_uid) REFERENCES users(uid) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_uid, product_id)
);
