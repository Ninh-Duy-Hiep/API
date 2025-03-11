const Label = require("../models/Label");
const LabelFavorite = require("../models/Favorite_Label");

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
    res.status(500).json({
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

    res.status(200).json({
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

// Gán nhãn vào thuốc/bệnh yêu thích
const assignLabel = async (req, res) => {
  const { label_id, favorite_disease_id, favorite_medicine_id } = req.body;

  if (!label_id || (!favorite_disease_id && !favorite_medicine_id)) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu label_id hoặc liên kết" });
  }

  try {
    const newLabelFavorite = await LabelFavorite.create({
      label_id,
      favorite_disease_id,
      favorite_medicine_id,
    });
    res.status(201).json({
      success: true,
      message: "Gán nhãn thành công",
      data: newLabelFavorite,
    });
  } catch (err) {
    console.error("Lỗi khi gán nhãn:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi gán nhãn", error: err });
  }
};

module.exports = {
  createLabel,
  getLabels,
  updateLabel,
  deleteLabel,
  assignLabel,
};
