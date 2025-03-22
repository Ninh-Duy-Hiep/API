const express = require('express');
const router = express.Router();
const { addFavoriteDisease, getFavoriteDisease, removeFavoriteDisease, updateFavoriteDiseaseNote } = require('../controller/favorite_DiseaseController');

// Thêm thuốc vào danh sách yêu thích 
router.post('/favoritesDisease/add', addFavoriteDisease);

// Lấy danh sách thuốc yêu thích
router.get('/favoritesDisease', getFavoriteDisease);

// Xóa thuốc khỏi danh sách yêu thích
router.delete('/favoritesDisease/remove', removeFavoriteDisease);

// Thay đổi thuốc trong danh sách yêu thích 
router.put('/favoritesDisease/update_note', updateFavoriteDiseaseNote);

module.exports = router;