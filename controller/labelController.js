const Label = require("../models/Label");
const FavoriteLabel = require("../models/Favorite_Label");
const FavoriteMedicine = require("../models/Favorite_Medicine");
const FavoriteDisease = require("../models/Favorite_Disease");
const Disease = require("../models/Disease");
const Medicine = require("../models/Medicine");

// Thêm nhãn mới
const createLabel = async (req, res) => {
  const { user_id, name, color } = req.body;

  if (!user_id || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu user_id hoặc tên nhãn" });
  }

  try {
    const newLabel = await Label.create({ user_id, name, color });
    res
      .status(201)
      .json({ success: true, message: "Tạo nhãn thành công", data: newLabel });
  } catch (err) {
    console.error("Lỗi khi tạo nhãn:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi tạo nhãn", error: err });
  }
};

// Lấy danh sách nhãn của người dùng
const getLabels = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "Thiếu user_id" });
  }

  try {
    const labels = await Label.findAll({ where: { user_id } });
    res.status(200).json({ success: true, data: labels });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách nhãn:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi lấy danh sách nhãn",
        error: err,
      });
  }
};

// Cập nhật nhãn
const updateLabel = async (req, res) => {
  const { id, name, color } = req.body;

  if (!id || (!name && !color)) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu id hoặc dữ liệu cập nhật" });
  }

  try {
    const label = await Label.findByPk(id);
    if (!label) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy nhãn" });
    }

    if (name) label.name = name;
    if (color) label.color = color;
    await label.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Cập nhật nhãn thành công",
        data: label,
      });
  } catch (err) {
    console.error("Lỗi khi cập nhật nhãn:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi cập nhật nhãn", error: err });
  }
};

// Xóa nhãn
const deleteLabel = async (req, res) => {
  const { id } = req.params;

  try {
    const label = await Label.findByPk(id);
    if (!label) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy nhãn" });
    }

    await label.destroy();
    res.status(200).json({ success: true, message: "Xóa nhãn thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa nhãn:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi xóa nhãn", error: err });
  }
};

// gán nhãn
const assignLabel = async (req, res) => {
  const { user_id, label_id, favorite_disease_id, favorite_medicine_id } =
    req.body;

  console.log("📩 Dữ liệu nhận được từ client:", req.body);

  if (!user_id || !label_id) {
    console.log("❌ LỖI: Thiếu thông tin cần thiết!");
    return res
      .status(400)
      .json({ success: false, message: "Thiếu thông tin cần thiết" });
  }

  try {
    let actualFavoriteMedicineId = null;
    let actualFavoriteDiseaseId = null;

    // ✅ Nếu có truyền favorite_medicine_id, kiểm tra xem nó có trong danh sách yêu thích không
    if (favorite_medicine_id) {
      const favoriteMedicine = await FavoriteMedicine.findOne({
        where: { medicine_id: favorite_medicine_id, user_id: user_id },
      });

      if (!favoriteMedicine) {
        return res.status(400).json({
          success: false,
          message: `Thuốc (medicine_id = ${favorite_medicine_id}) chưa được thêm vào danh sách yêu thích!`,
        });
      }

      actualFavoriteMedicineId = favoriteMedicine.id;
    }

    // ✅ Nếu có truyền favorite_disease_id, kiểm tra xem nó có trong danh sách yêu thích không
    if (favorite_disease_id) {
      const favoriteDisease = await FavoriteDisease.findOne({
        where: { disease_id: favorite_disease_id, user_id: user_id },
      });

      if (!favoriteDisease) {
        return res.status(400).json({
          success: false,
          message: `Bệnh (disease_id = ${favorite_disease_id}) chưa được thêm vào danh sách yêu thích!`,
        });
      }

      actualFavoriteDiseaseId = favoriteDisease.id;
    }

    // 🚀 Kiểm tra xem trong nhãn này đã có bệnh hoặc thuốc này chưa
    const existingLabelEntry = await FavoriteLabel.findOne({
      where: {
        user_id,
        label_id,
        favorite_medicine_id: actualFavoriteMedicineId || null,
        favorite_disease_id: actualFavoriteDiseaseId || null,
      },
    });

    if (existingLabelEntry) {
      return res.status(400).json({
        success: false,
        message: "Thuốc hoặc bệnh này đã có trong nhãn!",
      });
    }

    // ✅ Gán nhãn mới (thêm bản ghi mới)
    const newFavoriteLabel = await FavoriteLabel.create({
      user_id,
      label_id,
      favorite_disease_id: actualFavoriteDiseaseId || null,
      favorite_medicine_id: actualFavoriteMedicineId || null,
    });

    return res.status(201).json({
      success: true,
      message: "Gán nhãn thành công",
      data: newFavoriteLabel,
    });
  } catch (err) {
    console.error("❌ LỖI khi gán nhãn:", err.message, err.stack);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi gán nhãn",
      error: err.message,
    });
  }
};


// lấy danh sách nhãn gán với thuốc hoặc bệnh 
const getLabelDetails = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "Thiếu user_id" });
  }

  try {
    // Thay đổi cách query để lấy dữ liệu từ FavoriteLabel
    const favoriteLabels = await FavoriteLabel.findAll({
      where: { user_id },
      include: [
        {
          model: Label,
          attributes: ['name', 'color']
        },
        {
          model: FavoriteMedicine,
          as: 'Favorite_Medicine',
          include: [{
            model: Medicine,
            attributes: ['id', 'ten_thuoc']
          }]
        },
        {
          model: FavoriteDisease,
          // as: 'Favorite_Disease',
          include: [{
            model: Disease,
            attributes: ['id', 'ten_benh']
          }]
        }
      ]
    });


    const labelDetails = favoriteLabels.map(favLabel => ({
      labelName: favLabel.Label.name,
      labelColor: favLabel.Label.color,
      favoriteMedicine: favLabel.Favorite_Medicine ? {
        medicineName: favLabel.Favorite_Medicine.Medicine.ten_thuoc,  
        medicineId: favLabel.Favorite_Medicine.Medicine.id
      } : null,
      favoriteDisease: favLabel.FavoriteDisease ? {
        diseaseName: favLabel.FavoriteDisease.Disease.ten_benh,  
        diseaseId: favLabel.FavoriteDisease.Disease.id
      } : null
    }));

    // Log để debug
    console.log('Raw data:', JSON.stringify(favoriteLabels, null, 2));
    console.log('Formatted data:', JSON.stringify(labelDetails, null, 2));

    res.status(200).json({ 
      success: true, 
      data: labelDetails 
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách nhãn chi tiết:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách nhãn chi tiết",
      error: err.message
    });
  }
};




module.exports = {
  createLabel,
  getLabels,
  updateLabel,
  deleteLabel,
  assignLabel,
  getLabelDetails,
};
