// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEF-miiOOQ-yb42KTGYozNjUY8zImq2Ec",
    authDomain: "lesson3-b336e.firebaseapp.com",
    projectId: "lesson3-b336e",
    storageBucket: "lesson3-b336e.firebasestorage.app",
    messagingSenderId: "757879338973",
    appId: "1:757879338973:web:431390ad9fee86d23aa834",
    measurementId: "G-DQ1BM8DWMD"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Kiểm tra trạng thái đăng nhập
auth.onAuthStateChanged(user => {
    if (!user) {
        alert('Bạn cần đăng nhập để truy cập trang bán hàng.');
        window.location.href = 'login.html';
    }
});

// Xử lý đăng xuất
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        alert('Đăng xuất thành công!');
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Lỗi đăng xuất: ', error);
    });
});

// Xem trước hình ảnh sản phẩm khi người dùng nhập URL
const imageUrlInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const previewPlaceholder = document.getElementById('preview-placeholder');

imageUrlInput.addEventListener('input', function() {
    const url = this.value;
    if (url && url.startsWith('http')) {
        imagePreview.src = url;
        imagePreview.style.display = 'block';
        previewPlaceholder.style.display = 'none';
    } else {
        imagePreview.style.display = 'none';
        previewPlaceholder.style.display = 'flex';
    }
});

// Hàm xử lý nút bấm bên trong trang web nhỏ (Modal Tiện ích)
function runAction(actionName) {
    alert(`Tính năng: "${actionName}" đang được mở trong bảng điều khiển phụ!`);
}

// Hàm xác nhận gói quảng cáo
function confirmAds() {
    const selectedAds = document.querySelector('input[name="ads-package"]:checked').value;
    alert(`Đã áp dụng gói quảng cáo: ${selectedAds.toUpperCase()} thành công!`);
    // Đóng modal quảng cáo lại sau khi chọn xong
    const adsModal = bootstrap.Modal.getInstance(document.getElementById('marketingModal'));
    adsModal.hide();
}

// Xử lý sự kiện gửi form (đăng bán sản phẩm)
document.getElementById('sell-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Lấy giá trị từ các trường nhập liệu
    const productName = document.getElementById('product-name').value;
    const productCategory = document.getElementById('product-category').value;
    const productPrice = document.getElementById('product-price').value;
    const productDesc = document.getElementById('product-desc').value;
    const productImage = document.getElementById('product-image').value;

    // Tạo đối tượng sản phẩm mới
    const newProduct = {
        name: productName,
        category: productCategory,
        price: parseInt(productPrice),
        description: productDesc,
        image: productImage,
        sellerId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
        createdAt: new Date().toISOString()
    };

    console.log('Sản phẩm được tạo thành công:', newProduct);

    alert('Sản phẩm của bạn đã được đăng tải và chờ duyệt thành công!');
    
    // Reset form sau khi đăng thành công
    this.reset();
    imagePreview.style.display = 'none';
    previewPlaceholder.style.display = 'block';
    
    // Chuyển hướng về trang chủ
    window.location.href = 'index.html';
});