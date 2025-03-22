const express = require('express');
const router = express.Router();
const { addFavoriteMedicine, getFavoriteMedicines, removeFavoriteMedicine , updateFavoriteMedicineNote } = require('../controller/favorite_MedicineController');

// Thêm thuốc vào danh sách yêu thích 
router.post('/favoritesMedicine/add', addFavoriteMedicine);

// Lấy danh sách thuốc yêu thích
router.get('/favoritesMedicine', getFavoriteMedicines);

// Xóa thuốc khỏi danh sách yêu thích
router.delete('/favoritesMedicine/remove', removeFavoriteMedicine);

// Thay đổi thuốc trong danh sách yêu thích 
router.put('/favoritesMedicine/update_note', updateFavoriteMedicineNote);

module.exports = router;