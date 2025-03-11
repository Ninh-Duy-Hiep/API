const express = require('express');
const router = express.Router();
const { addFavoriteDisease, getFavoriteDisease, removeFavoriteDisease } = require('../controller/favorite_DiseaseController');

// Thêm thuốc vào danh sách yêu thích 
router.post('/favoritesDisease/add', addFavoriteDisease);

// Lấy danh sách thuốc yêu thích
router.get('/favoritesDisease', getFavoriteDisease);

// Xóa thuốc khỏi danh sách yêu thích
router.delete('/favoritesDisease/remove', removeFavoriteDisease);

module.exports = router;