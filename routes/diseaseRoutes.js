const express = require('express');
const router = express.Router();
const diseaseController = require('../controller/diseaseController');
// Lấy danh sách tất cả bệnh
router.get('/diseases', diseaseController.getAllDiseases);
// Tìm kiếm bệnh  
router.get('/diseases/search', diseaseController.searchDiseases);
// Thêm một bệnhbệnh
router.post('/diseases', diseaseController.addDisease);
// Thêm nhiều bệnh từ file CSV
router.post('/diseases/upload', diseaseController.upload.single('file'), diseaseController.addDiseasesFromCSV);

module.exports = router;
