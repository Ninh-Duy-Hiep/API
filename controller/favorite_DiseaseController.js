const FavoriteDisease = require("../models/Favorite_Disease");
const Disease = require("../models/Disease");

// Thêm bệnh vào danh sách yêu thích
const addFavoriteDisease = async (req, res) => {
  const { user_id, disease_id, note } = req.body; // Nhận thêm note từ request

  if (!user_id || !disease_id) {
    return res.status(400).json({ success: false, message: "Thiếu user_id hoặc disease_id" });
  }

  try {
    // Kiểm tra xem bệnh đã được yêu thích chưa
    const existingFavorite = await FavoriteDisease.findOne({
      where: { user_id, disease_id },
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: "Bệnh đã có trong danh sách yêu thích",
      });
    }

    // Thêm vào danh sách yêu thích với note
    const newFavorite = await FavoriteDisease.create({ user_id, disease_id, note });

    res.status(201).json({
      success: true,
      message: "Thêm bệnh vào danh sách yêu thích thành công",
      data: newFavorite,
    });
  } catch (err) {
    console.error("Lỗi khi thêm bệnh vào danh sách yêu thích:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi khi thêm bệnh vào danh sách yêu thích",
      error: err,
    });
  }
};


// Danh sách bệnh yêu thích
const getFavoriteDisease = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "Thiếu user_id" });
  }

  try {
    const favorites = await FavoriteDisease.findAll({
      where: { user_id },
      include: {
        model: Disease,
        attributes: ["id", "ten_benh", "dinh_nghia", "nguyen_nhan", "trieu_chung", "chan_doan", "dieu_tri"],
      },
      attributes: ["id", "note", "created_at"], // Lấy thêm note
    });

    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bệnh yêu thích:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách bệnh yêu thích",
      error: err,
    });
  }
};


// xóa bệnh khỏi danh sách yêy thích
const removeFavoriteDisease = async (req, res) => {
  const { user_id, disease_id } = req.body;

  if (!user_id || !disease_id) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu user_id hoặc disease_id" });
  }

  try {
    const favorite = await FavoriteDisease.findOne({
      where: { user_id, disease_id },
    });

    if (!favorite) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Bệnh không có trong danh sách yêu thích",
        });
    }

    await favorite.destroy();
    res
      .status(200)
      .json({
        success: true,
        message: "Xóa bệnh khỏi danh sách yêu thích thành công",
      });
  } catch (err) {
    console.error("Lỗi khi xóa bệnh khỏi danh sách yêu thích:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi xóa bệnh khỏi danh sách yêu thích",
        error: err,
      });
  }
};

module.exports = { addFavoriteDisease, getFavoriteDisease, removeFavoriteDisease };