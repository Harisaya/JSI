# Firebase Marketplace Hacker Theme

Ứng dụng thương mại điện tử với xác thực Firebase, giao diện hacker theme với hiệu ứng matrix.

## Tính năng

- 🔐 **Xác thực người dùng** - Đăng nhập/Đăng ký với Firebase Authentication
- 🛍️ **Marketplace** - Duyệt sản phẩm, tìm kiếm, lọc theo danh mục
- 🛒 **Giỏ hàng** - Thêm/xóa sản phẩm, quản lý số lượng
- 📦 **Đơn hàng** - Xem lịch sử đơn hàng
- 👤 **Hồ sơ** - Xem thông tin người dùng
- 💾 **Firestore** - Lưu dữ liệu người dùng, đơn hàng

## Cấu trúc dự án

```
.
├── index.html           # Trang Marketplace chính
├── login.html           # Trang Đăng nhập
├── signup.html          # Trang Đăng ký
├── src/
│   ├── main.js          # Logic Marketplace
│   ├── auth.js          # Logic Xác thực
│   ├── style.css        # CSS Marketplace
│   └── auth.css         # CSS xác thực
└── README.md
```

## Hướng dẫn sử dụng

### 1. Truy cập trang
- **Trang chủ**: `http://localhost:8000` (Marketplace)
- **Đăng nhập**: Click nút 🔐 góc trái hoặc vào `login.html`
- **Đăng ký**: Click nút 📝 góc phải hoặc vào `signup.html`

### 2. Đăng ký tài khoản
- Nhập Tên, Email, Số điện thoại, Địa chỉ, Mật khẩu
- Xác nhận mật khẩu
- Click "Đăng ký"
- Sẽ tự động chuyển hướng đến Marketplace sau khi thành công

### 3. Đăng nhập
- Nhập Email và Mật khẩu
- Click "Đăng nhập"
- Sẽ tự động chuyển hướng đến Marketplace sau khi thành công

### 4. Mua sắm
- Tìm kiếm sản phẩm bằng thanh tìm kiếm
- Lọc theo danh mục (Điện tử, Thời trang, Thực phẩm, Nhà cửa)
- Sắp xếp theo giá hoặc đánh giá
- Click "➕ Thêm" để thêm vào giỏ hàng

### 5. Thanh toán
- Vào trang "🛒 Giỏ"
- Điều chỉnh số lượng sản phẩm
- Click "Đặt hàng"
- Đơn hàng sẽ được lưu trong Firestore

### 6. Xem đơn hàng
- Vào trang "📦 Đơn hàng"
- Xem danh sách các đơn hàng đã đặt
- Xem chi tiết số tiền, trạng thái, số lượng sản phẩm

### 7. Xem hồ sơ
- Vào trang "👤 Hồ sơ"
- Xem thông tin cá nhân
- Click "🚪 Đăng xuất" ở góc phải để thoát

## Cấu hình Firebase

Firebase config được lưu trong `src/main.js`, `src/auth.js`, và `src/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Yêu cầu

- Python 3+ (để chạy local server)
- Trình duyệt hiện đại
- Kết nối Internet (Firebase)

## Chạy ứng dụng

1. Mở terminal ở thư mục dự án
2. Chạy: `python -m http.server`
3. Truy cập: `http://localhost:8000`

## Dữ liệu lưu trong Firestore

### Collection: users
```
{
  name: "Tên người dùng",
  email: "email@example.com",
  phone: "0123456789",
  address: "Địa chỉ đầy đủ",
  createdAt: "2026-04-05T..."
}
```

### Collection: orders
```
{
  userId: "uid_của_người_dùng",
  items: [
    {
      id: "product_id",
      name: "Tên sản phẩm",
      price: 100000,
      quantity: 2,
      image: "url"
    }
  ],
  total: 215000,
  status: "pending",
  createdAt: "2026-04-05T..."
}
```

## Ghi chú

- Dữ liệu sản phẩm hiện tại là mock data
- Có thể kết nối với API thực tế bằng cách sửa hàm `getMockProducts()`
- Hiệu ứng matrix có thể tắt bằng cách comment hàm `createMatrixEffect()`

## Tác giả

Firebase Marketplace - 2026