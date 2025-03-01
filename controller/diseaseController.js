const multer = require("multer");
const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");
const Disease = require("../models/Disease");
const { Op } = require("sequelize");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Lấy danh sách tất cả bệnhbệnh
const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.findAll();
    res.status(200).json({
      success: true,
      data: diseases,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách thuốc", err);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách thuốc",
      error: err,
    });
  }
};

// Tìm kiếm bệnh  theo từ khóa
const searchDiseases = async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Cần có từ khóa tìm kiếm",
    });
  }

  try {
    const diseases = await Disease.findAll({
      where: {
        ten_benh: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    });

    if (diseases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thuốc phù hợp",
      });
    }

    res.status(200).json({
      success: true,
      data: diseases,
    });
  } catch (err) {
    console.error("Lỗi khi tìm kiếm thuốc", err);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tìm kiếm thuốc",
      error: err,
    });
  }
};

// Thêm một bệnh vào CSDL
const addDisease = async (req, res) => {
  const { ten_benh, dinh_nghia, nguyen_nhan, trieu_chung, chan_doan  } = req.body;

  if (!ten_benh) {
    return res.status(400).json({ success: false, message: 'Tên bệnh là bắt buộc' });
  }

  try {
    const existingDisease = await Disease.findOne({ where: { ten_benh } });
    if (existingDisease) {
      return res.status(409).json({ success: false, message: 'Bệnh đã tồn tại trong CSDL' });
    }

    const newDisease = await Disease.create({
      ten_benh, dinh_nghia, nguyen_nhan, trieu_chung, chan_doan
    });

    res.status(201).json({ success: true, message: 'Thêm bệnh thành công', data: newDisease });
  } catch (err) {
    console.error('Lỗi khi thêm bệnh:', err);
    res.status(500).json({ success: false, message: 'Lỗi khi thêm bệnh', error: err });
  }
};

// Thêm nhiều bệnh từ file CSV
const addDiseasesFromCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Không có file nào được tải lên' });
  }

  const filePath = req.file.path;
  const diseasesToAdd = [];

  // Đọc file CSV
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      diseasesToAdd.push(row);
    })
    .on('end', async () => {
      try {
        const existingDiseases = await Disease.findAll({ attributes: ['ten_benh'] });
        const existingNames = existingDiseases.map(med => med.ten_benh);

        // Lọc các bệnh chưa có trong CSDL
        const newDiseases = diseasesToAdd.filter(med => !existingNames.includes(med.ten_benh));

        if (newDiseases.length === 0) {
          return res.status(409).json({ success: false, message: 'Tất cả bệnh trong file đã tồn tại trong CSDL' });
        }

        await Disease.bulkCreate(newDiseases);
        res.status(201).json({ success: true, message: 'Thêm bệnh thành công', data: newDiseases });
      } catch (err) {
        console.error('Lỗi khi thêm bệnh từ CSV:', err);
        res.status(500).json({ success: false, message: 'Lỗi khi thêm bệnh từ CSV', error: err });
      } finally {
        fs.unlinkSync(filePath); // Xóa file sau khi xử lý xong
      }
    });
};

module.exports = { getAllDiseases, searchDiseases, addDisease ,addDiseasesFromCSV , upload} 
