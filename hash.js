const bcrypt = require('bcryptjs');

// Hàm băm mật khẩu
async function hashPassword(plainPassword) {
    const saltRounds = 10; // Số vòng mã hóa
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

// Test thử
hashPassword("12345").then(hash => console.log("Hashed Password:", hash));
