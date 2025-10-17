const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all users with follower/following counts
router.get('/getallusers', async (req, res) => {
  try {
    const query = `
      SELECT 
        u.*,
        COUNT(DISTINCT f1.follower_id) as followers_count,
        COUNT(DISTINCT f2.following_id) as following_count
      FROM users u
      LEFT JOIN follows f1 ON u.id = f1.following_id
      LEFT JOIN follows f2 ON u.id = f2.follower_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;
    const result = await dbpool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/adduser', async (req, res) => {
  const { name, email, phone, dob, image_url } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, phone, dob, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, dob, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Server error');
  }
});

// Update user by Id
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, dob, image_url } = req.body;

  try {
    const result = await db.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           phone = $3,
           dob = $4,
           image_url = $5
       WHERE id = $6
       RETURNING *`,
      [name, email, phone, dob, image_url, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
