const express = require('express');
const router = express.Router();
const medicineController = require('../controller/medicineController');
// Lấy danh sách tất cả thuốc
router.get('/medicines', medicineController.getAllMedicines);

// Lấy 10 thuốc 1 trang 
router.get('/medicines/paginated', medicineController.getPaginatedMedicines);

// Tìm kiếm thuốc theo từ khóa
router.get('/medicines/search', medicineController.searchMedicines);

// Thêm một thuốc
router.post('/medicines', medicineController.addMedicine);

// Thêm nhiều thuốc từ file CSV
router.post('/medicines/upload', medicineController.upload.single('file'), medicineController.addMedicinesFromCSV);


module.exports = router;
