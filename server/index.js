const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import database pool
const db = require('./config/db');

app.get('/', (req, res) => {
  res.send('Backend Server is running');
});

// Test DB route
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Database connected successfully', solution: rows[0].solution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Users API
app.post('/api/users', async (req, res) => {
  const { uid, email, name } = req.body;
  try {
    await db.query('INSERT IGNORE INTO users (uid, email, name) VALUES (?, ?, ?)', [uid, email, name]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cart API
app.get('/api/cart/:uid', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT product_data, quantity FROM cart_items WHERE user_uid = ?', [req.params.uid]);
    const cart = rows.map(r => ({ ...r.product_data, quantity: r.quantity }));
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart/add', async (req, res) => {
  const { uid, product, quantity } = req.body;
  try {
    await db.query(
      'INSERT INTO cart_items (user_uid, product_id, product_data, quantity) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = ?, product_data = ?',
      [uid, product.id, JSON.stringify(product), quantity, quantity, JSON.stringify(product)]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart/remove', async (req, res) => {
  const { uid, product_id } = req.body;
  try {
    await db.query('DELETE FROM cart_items WHERE user_uid = ? AND product_id = ?', [uid, product_id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart/clear', async (req, res) => {
  const { uid } = req.body;
  try {
    await db.query('DELETE FROM cart_items WHERE user_uid = ?', [uid]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Favorites API
app.get('/api/favorites/:uid', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT product_id FROM favorites WHERE user_uid = ?', [req.params.uid]);
    res.json(rows.map(r => r.product_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/favorites/toggle', async (req, res) => {
  const { uid, product_id, isFavorite } = req.body;
  try {
    if (isFavorite) {
      await db.query('INSERT IGNORE INTO favorites (user_uid, product_id) VALUES (?, ?)', [uid, product_id]);
    } else {
      await db.query('DELETE FROM favorites WHERE user_uid = ? AND product_id = ?', [uid, product_id]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
