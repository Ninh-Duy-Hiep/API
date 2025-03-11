const express = require('express');
const router = express.Router();
const { addFavoriteMedicine, getFavoriteMedicines, removeFavoriteMedicine } = require('../controller/favorite_MedicineController');

// Thêm thuốc vào danh sách yêu thích 
router.post('/favoritesMedicine/add', addFavoriteMedicine);

// Lấy danh sách thuốc yêu thích
router.get('/favoritesMedicine', getFavoriteMedicines);

// Xóa thuốc khỏi danh sách yêu thích
router.delete('/favoritesMedicine/remove', removeFavoriteMedicine);

module.exports = router;