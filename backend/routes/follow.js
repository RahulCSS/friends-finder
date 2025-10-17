const express = require('express');
const router = express.Router();
const db = require('../database');

// FOLLOW a user
router.post('/followuser', async (req, res) => {
  const { follower_id, following_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *',
      [follower_id, following_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating follow:', err);
    res.status(500).send('Server error');
  }
});

// UNFOLLOW a user
router.delete('/unfollowuser', async (req, res) => {
  const { follower_id, following_id } = req.body;
  try {
    await db.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [follower_id, following_id]
    );
    res.status(204).send('User unfollowed successfully');
  } catch (err) {
    console.error('Error removing follow:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
