const express = require('express');
const router = express.Router();
const { addFavoriteMedicine, getFavoriteMedicines, removeFavoriteMedicine } = require('../controller/favoriteController');

// Thêm thuốc vào danh sách yêu thích 
router.post('/favorites/add', addFavoriteMedicine);

// Lấy danh sách thuốc yêu thích
router.get('/favorites', getFavoriteMedicines);

// Xóa thuốc khỏi danh sách yêu thích
router.delete('/favorites/remove', removeFavoriteMedicine);

module.exports = router;