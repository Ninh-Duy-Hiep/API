const express = require('express');
const router = express.Router();
const medicineController = require('../controller/medicineController');

// Lấy danh sách tất cả thuốc
router.get('/medicines', medicineController.getAllMedicines);

// Tìm kiếm thuốc theo từ khóa
router.get('/medicines/search', medicineController.searchMedicines);

module.exports = router;
