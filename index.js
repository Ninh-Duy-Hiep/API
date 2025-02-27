const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
const medicineRoutes = require('./routes/medicineRoutes');
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Hỗ trợ form-data

// Sử dụng các routes
app.use('/api', medicineRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', diseaseRoutes);
// Lắng nghe server
app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
});
