const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const medicineRoutes = require('./routes/medicineRoutes');
const authRoutes = require('./routes/authRoutes');
const favoriteDiseaseRoutes = require('./routes/favorite_DiseaseRoutes');
const favoriteMedicineRoutes = require('./routes/favorite_MedicineRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const labelRoutes = require('./routes/labelRoutes');
require('./models/User');
require('./models/Label');
require('./models/Favorite_Disease');
require('./models/Favorite_Medicine');
require('./models/Favorite_Label');

const setupAssociations = require('./models/associations');
setupAssociations();

dotenv.config();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Hỗ trợ form-data

// Sử dụng các routes
app.use('/api', medicineRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', favoriteDiseaseRoutes);
app.use('/api', favoriteMedicineRoutes);
app.use('/api', diseaseRoutes);
app.use('/api', labelRoutes);

// Lắng nghe server
app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
});
