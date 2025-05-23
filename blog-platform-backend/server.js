// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { verifyToken } = require('./middleware/auth');
const app = express();
dotenv.config();

const db = require('./utils/db'); // MySQL connection

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
