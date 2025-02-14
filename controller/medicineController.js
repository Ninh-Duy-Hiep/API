const Medicine = require('../models/Medicine');
const { Op } = require('sequelize');

// Lấy danh sách tất cả thuốc
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.status(200).json({
      success: true,
      data: medicines
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách thuốc', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách thuốc',
      error: err
    });
  }
};

// Tìm kiếm thuốc theo từ khóa
const searchMedicines = async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: 'Cần có từ khóa tìm kiếm'
    });
  }

  try {
    const medicines = await Medicine.findAll({
      where: {
        medicine_name: {
          [Op.like]: `%${searchTerm}%`  
        }
      }
    });

    if (medicines.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thuốc phù hợp'
      });
    }

    res.status(200).json({
      success: true,
      data: medicines
    });
  } catch (err) {
    console.error('Lỗi khi tìm kiếm thuốc', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm kiếm thuốc',
      error: err
    });
  }
};

module.exports = { getAllMedicines, searchMedicines };
