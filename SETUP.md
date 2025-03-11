# 📌 Danh sách API

## 🏥 **API Thuốc (Medicines)**

- **Lấy danh sách tất cả thuốc**  
  `GET http://localhost:3000/api/medicines`

- **Tìm kiếm thuốc theo từ khóa**  
  `GET http://localhost:3000/api/medicines/search?searchTerm=keyword`

- **Thêm thuốc mới**  
  `POST http://localhost:3000/api/medicines`

- **Thêm file thuốc**  
  `POST http://localhost:3000/api/medicines/upload`

---

## 🦠 **API Bệnh (Diseases)**

- **Lấy danh sách tất cả bệnh**  
  `GET http://localhost:3000/api/diseases`

- **Tìm kiếm bệnh theo từ khóa**  
  `GET http://localhost:3000/api/diseases/search?searchTerm=keyword`

- **Thêm bệnh mới**  
  `POST http://localhost:3000/api/diseases`

- **Thêm file bệnh**  
  `POST http://localhost:3000/api/diseases/upload`

---

## ❤️ **API Danh sách yêu thích (Favorites)**

### 🔹 **Thuốc yêu thích (Favorites Disease)**
- **Thêm thuốc vào danh sách yêu thích**  
  `POST http://localhost:3000/api/favoritesDisease/add`

- **Lấy danh sách thuốc theo người dùng**  
  `GET http://localhost:3000/api/favoritesDisease?user_id=USER_ID`

- **Xóa thuốc khỏi danh sách yêu thích**  
  `DELETE http://localhost:3000/api/favoritesDisease/remove`

### 🔹 **Bệnh yêu thích (Favorites Medicine)**
- **Thêm bệnh vào danh sách yêu thích**  
  `POST http://localhost:3000/api/favoritesMedicine/add`

- **Lấy danh sách bệnh theo người dùng**  
  `GET http://localhost:3000/api/favoritesMedicine?user_id=USER_ID`

- **Xóa bệnh khỏi danh sách yêu thích**  
  `DELETE http://localhost:3000/api/favoritesMedicine/remove`

---

## 🔐 **API Xác thực (Authentication)**

- **Đăng ký tài khoản**  
  `POST http://localhost:3000/api/auth/register`

- **Đăng nhập**  
  `POST http://localhost:3000/api/auth/login`

---

## 🏷 **API Nhãn dán (Labels)**

- **Thêm nhãn dán mới**  
  `POST http://localhost:3000/api/labels`

- **Lấy danh sách nhãn dán theo người dùng**  
  `GET http://localhost:3000/api/labels?user_id=USER_ID`

- **Cập nhật nhãn dán**  
  `PUT http://localhost:3000/api/labels`

- **Xóa nhãn dán**  
  `DELETE http://localhost:3000/api/labels/?`

- **Gán nhãn dán vào thuốc hoặc bệnh**  
  `POST http://localhost:3000/api/labels/assign`