const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Tài khoản này đã được đăng ký' });
    }

    // Tạo user với role mặc định là 'user'
    const user = await User.create({ username, password, role: 'user' });

    res.status(201).json({ success: true, message: 'Đăng ký thành công', user });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Lỗi đăng ký', error: err });
  }
};



const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Sai thông tin đăng nhập' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, // Thêm role vào token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role } 
    });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Lỗi đăng nhập', error: err });
  }
};

module.exports = { register, login };
