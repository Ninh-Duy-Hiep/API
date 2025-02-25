const multer = require('multer');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const Medicine = require('../models/Medicine');
const { Op } = require('sequelize');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage }); 

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

// Lấy danh sách thuốc với phâ  n trang (10 thuốc mỗi lần)
const getPaginatedMedicines = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại
  const limit = 10; // Số thuốc mỗi trang
  const offset = (page - 1) * limit;

  try {
    const { count, rows: medicines } = await Medicine.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.status(200).json({
      success: true,
      totalMedicines: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(count / limit), // Có trang tiếp theo không
      hasPreviousPage: page > 1, // Có trang trước không
      data: medicines
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách thuốc có phân trang', err);
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

// Thêm một thuốc vào CSDL
const addMedicine = async (req, res) => {
  const { medicine_name, composition, uses, side_effects, image_url, manufacturer, excellent_review_percent, average_review_percent, poor_review_percent } = req.body;

  if (!medicine_name) {
    return res.status(400).json({ success: false, message: 'Tên thuốc là bắt buộc' });
  }

  try {
    const existingMedicine = await Medicine.findOne({ where: { medicine_name } });
    if (existingMedicine) {
      return res.status(409).json({ success: false, message: 'Thuốc đã tồn tại trong CSDL' });
    }

    const newMedicine = await Medicine.create({
      medicine_name, composition, uses, side_effects, image_url, manufacturer, excellent_review_percent, average_review_percent, poor_review_percent
    });

    res.status(201).json({ success: true, message: 'Thêm thuốc thành công', data: newMedicine });
  } catch (err) {
    console.error('Lỗi khi thêm thuốc:', err);
    res.status(500).json({ success: false, message: 'Lỗi khi thêm thuốc', error: err });
  }
};

// Thêm nhiều thuốc từ file CSV
const addMedicinesFromCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Không có file nào được tải lên' });
  }

  const filePath = req.file.path;
  const medicinesToAdd = [];

  // Đọc file CSV
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      medicinesToAdd.push(row);
    })
    .on('end', async () => {
      try {
        const existingMedicines = await Medicine.findAll({ attributes: ['medicine_name'] });
        const existingNames = existingMedicines.map(med => med.medicine_name);

        // Lọc các thuốc chưa có trong CSDL
        const newMedicines = medicinesToAdd.filter(med => !existingNames.includes(med.medicine_name));

        if (newMedicines.length === 0) {
          return res.status(409).json({ success: false, message: 'Tất cả thuốc trong file đã tồn tại trong CSDL' });
        }

        await Medicine.bulkCreate(newMedicines);
        res.status(201).json({ success: true, message: 'Thêm thuốc thành công', data: newMedicines });
      } catch (err) {
        console.error('Lỗi khi thêm thuốc từ CSV:', err);
        res.status(500).json({ success: false, message: 'Lỗi khi thêm thuốc từ CSV', error: err });
      } finally {
        fs.unlinkSync(filePath); // Xóa file sau khi xử lý xong
      }
    });
};



module.exports = { getAllMedicines, getPaginatedMedicines, searchMedicines, addMedicine, addMedicinesFromCSV, upload };
