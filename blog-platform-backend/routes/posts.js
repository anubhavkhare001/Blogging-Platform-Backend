// routes/posts.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { verifyToken } = require('../middleware/auth');

// Public: Get All Posts
router.get('/', (req, res) => {
  const sql = `SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id ORDER BY posts.created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching posts', error: err });
    res.json(results);
  });
});

// Public: Get Single Post
router.get('/:id', (req, res) => {
  const sql = `SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id WHERE posts.id = ?`;
  db.query(sql, [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(results[0]);
  });
});

// Protected: Create Post
router.post('/', verifyToken, (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id;

  const sql = 'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)';
  db.query(sql, [title, content, author_id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating post', error: err });
    res.status(201).json({ id: result.insertId, title, content });
  });
});

// Protected: Update Post (author only)
router.put('/:id', verifyToken, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const checkSql = 'SELECT * FROM posts WHERE id = ? AND author_id = ?';
  db.query(checkSql, [req.params.id, userId], (err, results) => {
    if (err || results.length === 0) return res.status(403).json({ message: 'Unauthorized' });

    const updateSql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.query(updateSql, [title, content, req.params.id], (err) => {
      if (err) return res.status(500).json({ message: 'Error updating post', error: err });
      res.json({ message: 'Post updated successfully' });
    });
  });
});

// Protected: Delete Post (author only)
router.delete('/:id', verifyToken, (req, res) => {
  const userId = req.user.id;

  const checkSql = 'SELECT * FROM posts WHERE id = ? AND author_id = ?';
  db.query(checkSql, [req.params.id, userId], (err, results) => {
    if (err || results.length === 0) return res.status(403).json({ message: 'Unauthorized' });

    const deleteSql = 'DELETE FROM posts WHERE id = ?';
    db.query(deleteSql, [req.params.id], (err) => {
      if (err) return res.status(500).json({ message: 'Error deleting post', error: err });
      res.json({ message: 'Post deleted successfully' });
    });
  });
});

module.exports = router;
