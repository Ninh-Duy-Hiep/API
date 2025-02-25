const Favorite = require("../models/Favorite");
const Medicine = require("../models/Medicine");

// Thêm thuốc vào danh sách yêu thích
const addFavoriteMedicine = async (req, res) => {
  const { user_id, medicine_id } = req.body;

  if (!user_id || !medicine_id) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu user_id hoặc medicine_id" });
  }

  try {
    // Kiểm tra xem thuốc đã được yêu thích chưa
    const existingFavorite = await Favorite.findOne({
      where: { user_id, medicine_id },
    });

    if (existingFavorite) {
      return res
        .status(409)
        .json({
          success: false,
          message: "Thuốc đã có trong danh sách yêu thích",
        });
    }

    // Thêm vào danh sách yêu thích
    const newFavorite = await Favorite.create({ user_id, medicine_id });
    res
      .status(201)
      .json({
        success: true,
        message: "Thêm thuốc vào danh sách yêu thích thành công",
        data: newFavorite,
      });
  } catch (err) {
    console.error("Lỗi khi thêm thuốc vào danh sách yêu thích:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi thêm thuốc vào danh sách yêu thích",
        error: err,
      });
  }
};

// Danh sách thuốc yêu thích
const getFavoriteMedicines = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "Thiếu user_id" });
  }

  try {
    const favorites = await Favorite.findAll({
      where: { user_id },
      include: {
        model: Medicine,
        attributes: ["id", "medicine_name", "composition", "uses", "image_url"],
      },
    });

    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách thuốc yêu thích:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi lấy danh sách thuốc yêu thích",
        error: err,
      });
  }
};

// xóa thuốc khỏi danh sách yêy thích
const removeFavoriteMedicine = async (req, res) => {
  const { user_id, medicine_id } = req.body;

  if (!user_id || !medicine_id) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu user_id hoặc medicine_id" });
  }

  try {
    const favorite = await Favorite.findOne({
      where: { user_id, medicine_id },
    });

    if (!favorite) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Thuốc không có trong danh sách yêu thích",
        });
    }

    await favorite.destroy();
    res
      .status(200)
      .json({
        success: true,
        message: "Xóa thuốc khỏi danh sách yêu thích thành công",
      });
  } catch (err) {
    console.error("Lỗi khi xóa thuốc khỏi danh sách yêu thích:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi xóa thuốc khỏi danh sách yêu thích",
        error: err,
      });
  }
};

module.exports = { addFavoriteMedicine, getFavoriteMedicines, removeFavoriteMedicine };