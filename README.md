# Chợ Xịn Marketplace

Dự án marketplace front-end + proxy backend cho Chợ Tốt.
Ứng dụng bao gồm giao diện khách hàng trong `Client/` và server Node.js trong `Server/`.

## Tổng quan

- `Client/`: giao diện tĩnh HTML/CSS/JS
- `Server/index.js`: backend Express proxy cho API Chợ Tốt và phục vụ static files
- `index.js`: server bổ sung tại root cho upload ảnh Cloudinary (sử dụng `.env`)

## Tính năng

- 🛍️ Duyệt sản phẩm từ Chợ Tốt public API
- 🔎 Tìm kiếm, lọc theo danh mục và theo khoảng thời gian
- 🛒 Giỏ hàng với tổng tiền, phí giao hàng và đặt đơn
- 📦 Trang đơn hàng và trang hồ sơ người dùng
- 🌐 Backend proxy `/api/chotot` để tránh CORS
- ☁️ Upload ảnh qua Cloudinary trên endpoint `/upload`

## Cấu trúc dự án

```
.
├── Client/                    # Front-end khách hàng
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── order.html
│   ├── pay.html
│   ├── product.html
│   ├── sell.html
│   ├── roleManagement.js
│   ├── auth.js
│   ├── auth.css
│   ├── chatbot.js
│   ├── main.js
│   ├── style.css
│   └── ...
├── Img/                       # Hình ảnh dùng trong giao diện
├── Server/                    # Backend proxy và server Node.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── middleware/multer.js
│   ├── utils/cloudinary.js
│   └── README.md
├── index.js                   # Server upload Cloudinary bổ sung
├── tasks.json                 # Tasks VS Code để chạy server
├── .env                       # Biến môi trường cho upload Cloudinary
├── ADMIN_SYSTEM_DOCUMENTATION.md
├── ROLE_SYSTEM_DOCUMENTATION.md
└── README.md
```

## Chạy ứng dụng

### 1. Chạy backend proxy và static server

```bash
cd Server
npm install
npm start
```

- `Server/index.js` sẽ chạy trên `http://localhost:3000`
- Backend cung cấp endpoint `/api/chotot`
- Server này cũng phục vụ file tĩnh từ thư mục `Client/`

### 2. Mở giao diện client

- Mở `http://localhost:3000/index.html`

### 3. Khởi động bằng VS Code tasks

- `Run Dev Server`: `python -m http.server` (phục vụ tệp tĩnh)
- `Run Node Proxy Server`: `cd Server && npm start`

Khi dùng task `Run Dev Server`, mở `http://localhost:8000/Client/index.html`.

## Cấu hình môi trường (Cloudinary upload)

Nếu bạn muốn sử dụng upload ảnh qua Cloudinary với server root `index.js`, tạo file `.env` chứa:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Sau đó chạy:

```bash
node index.js
```

- Route upload: `POST /upload`
- Root health check: `GET /`

## Các endpoint chính

- `/api/chotot`: proxy tới Chợ Tốt public API, trả về JSON kết quả và cache 1 giờ
- `/upload`: upload ảnh lên Cloudinary (khi chạy root server)

## Lưu ý

- `Server/index.js` là entrypoint chính cho backend proxy và phục vụ giao diện
- `index.js` ở root chỉ dùng cho upload Cloudinary và yêu cầu `.env`
- Nếu server Chợ Tốt không phản hồi, app sẽ hiển thị thông báo lỗi và tiếp tục sử dụng dữ liệu hiện có

## Mục tiêu dự án

Chợ Xịn xây dựng mô hình marketplace giả lập, kết hợp frontend bán hàng với backend proxy API, cho phép:

- Truy cập dữ liệu từ Chợ Tốt
- Tìm kiếm và lọc sản phẩm
- Quản lý giỏ hàng và đơn hàng
- Đăng nhập/đăng ký người dùng

## Tác giả

Chợ Xịn Market - 2026
