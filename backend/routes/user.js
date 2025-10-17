const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all users
router.get('/allusers', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

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
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/adduser', async (req, res) => {
  const { name, email, phone, date_of_birth, profile_image_url } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, phone,  date_of_birth, profile_image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, date_of_birth, profile_image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Server error');
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.phone,
        u.date_of_birth,
        u.profile_image_url,
        u.created_at,
        u.updated_at,
        COUNT(DISTINCT f1.follower_id) as followers_count,
        COUNT(DISTINCT f2.following_id) as following_count
      FROM users u
      LEFT JOIN follows f1 ON u.id = f1.following_id
      LEFT JOIN follows f2 ON u.id = f2.follower_id
      WHERE u.id = $1
      GROUP BY u.id, u.name, u.email, u.phone, u.date_of_birth, u.profile_image_url, u.created_at, u.updated_at
    `;
    const result = await db.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user by Id
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, date_of_birth, profile_image_url } = req.body;

  try {
    const result = await db.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           phone = $3,
           date_of_birth = $4,
           profile_image_url = $5
       WHERE id = $6
       RETURNING *`,
      [name, email, phone, date_of_birth, profile_image_url , userId]
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

// GET users that current user is following
router.get('/:id/following', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.phone,
        u.date_of_birth,
        u.profile_image_url,
        f.created_at as followed_at
      FROM users u
      INNER JOIN follows f ON u.id = f.following_id
      WHERE f.follower_id = $1
      ORDER BY f.created_at DESC
    `;
    
    const result = await dbpool.query(query, [id]);
    res.json(result.rows);
    
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET followers of current user
router.get('/:id/followers', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.phone,
        u.date_of_birth,
        u.profile_image_url,
        f.created_at as followed_at
      FROM users u
      INNER JOIN follows f ON u.id = f.follower_id
      WHERE f.following_id = $1
      ORDER BY f.created_at DESC
    `;
    
    const result = await dbpool.query(query, [id]);
    res.json(result.rows);
    
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
