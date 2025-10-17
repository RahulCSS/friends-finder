const express = require('express');
const dbpool = require('./database');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user');
const followRoutes = require('./routes/follow');


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Friends Finder backend is live !');
});

// Routes
app.use('/user', userRoutes);
app.use('/follow', followRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

