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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
let db = null;
try {
    db = firebase.firestore();
} catch (e) {
    console.warn("Firestore chưa sẵn sàng:", e && e.message);
}
 
const USER_PRODUCTS_KEY = "userProducts";
const CATEGORY_LABELS = {
    electronics: "Đồ điện tử",
    fashion: "Thời trang & Phụ kiện",
    home: "Nhà cửa & Đời sống",
    vehicles: "Phương tiện",
    appliances: "Đồ gia dụng",
    other: "Khác"
};
 
// Kiểm tra trạng thái đăng nhập
let currentUser = null;
auth.onAuthStateChanged(user => {
    currentUser = user;
    if (!user) {
        showToast("Bạn cần đăng nhập để đăng bán sản phẩm.", "error");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
    }
});
 
// ==================== TIỆN ÍCH GIAO DIỆN ====================
function showToast(message, type = "info") {
    const toast = document.getElementById("sell-toast");
    if (!toast) {
        alert(message);
        return;
    }
    toast.textContent = message;
    toast.className = `sell-toast sell-toast--${type} visible`;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
        toast.classList.remove("visible");
    }, 3000);
}
 
function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add("visible");
}
function closeModal(el) {
    const overlay = el.closest ? el.closest(".sell-modal-overlay") : el;
    if (overlay) overlay.classList.remove("visible");
}
 
document.addEventListener("DOMContentLoaded", () => {
    // ---- Đăng xuất ----
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            auth.signOut().then(() => {
                window.location.href = "login.html";
            }).catch((error) => {
                console.error("Lỗi đăng xuất:", error);
                window.location.href = "login.html";
            });
        });
    }
 
    // ---- Mở / đóng modal ----
    const openUtilityBtn = document.getElementById("openUtilityBtn");
    if (openUtilityBtn) openUtilityBtn.addEventListener("click", () => openModal("utilityModal"));
 
    const openMarketing = (e) => { e.preventDefault(); openModal("marketingModal"); };
    const mkBtn1 = document.getElementById("openMarketingBtn");
    const mkBtn2 = document.getElementById("openMarketingBtn2");
    if (mkBtn1) mkBtn1.addEventListener("click", openMarketing);
    if (mkBtn2) mkBtn2.addEventListener("click", openMarketing);
 
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
        btn.addEventListener("click", () => closeModal(btn));
    });
    document.querySelectorAll(".sell-modal-overlay").forEach((overlay) => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) overlay.classList.remove("visible");
        });
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".sell-modal-overlay.visible")
                .forEach((o) => o.classList.remove("visible"));
        }
    });
 
    // ---- Nút trong modal Tiện ích ----
    document.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", () => {
            closeModal(btn);
            showToast(`Tính năng "${btn.dataset.action}" sẽ sớm ra mắt!`, "info");
        });
    });
 
    // ---- Chọn gói quảng cáo ----
    const confirmAdsBtn = document.getElementById("confirmAdsBtn");
    if (confirmAdsBtn) {
        confirmAdsBtn.addEventListener("click", () => {
            const checked = document.querySelector('input[name="ads-package"]:checked');
            const label = checked ? (checked.dataset.label || checked.value) : "Cơ Bản (Miễn phí)";
            const valueEl = document.getElementById("sell-ads-value");
            if (valueEl) valueEl.textContent = label;
            closeModal(confirmAdsBtn);
            showToast(`Đã chọn gói "${label}".`, "success");
        });
    }
 
    // ---- Xem trước ảnh + tên + giá ----
    const imageUrlInput = document.getElementById("product-image");
    const imagePreview = document.getElementById("image-preview");
    const previewPlaceholder = document.getElementById("preview-placeholder");
    const nameInput = document.getElementById("product-name");
    const priceInput = document.getElementById("product-price");
    const previewName = document.getElementById("preview-name");
    const previewPrice = document.getElementById("preview-price");
 
    if (imageUrlInput) {
        imageUrlInput.addEventListener("input", function () {
            const url = this.value.trim();
            if (url && url.startsWith("http")) {
                imagePreview.src = url;
                imagePreview.style.display = "block";
                previewPlaceholder.style.display = "none";
            } else {
                imagePreview.style.display = "none";
                previewPlaceholder.style.display = "flex";
            }
        });
    }
    if (nameInput) {
        nameInput.addEventListener("input", function () {
            previewName.textContent = this.value.trim() || "Tên sản phẩm của bạn";
        });
    }
    if (priceInput) {
        priceInput.addEventListener("input", function () {
            const n = parseInt(this.value, 10);
            previewPrice.textContent = n > 0 ? `${n.toLocaleString("vi-VN")} đ` : "0 đ";
        });
    }
 
    // ---- Gửi form đăng bán ----
    const form = document.getElementById("sell-product-form");
    if (form) form.addEventListener("submit", handleSubmit);
});
 
function getUserProducts() {
    try {
        return JSON.parse(localStorage.getItem(USER_PRODUCTS_KEY) || "[]");
    } catch (e) {
        return [];
    }
}
 
function saveUserProductLocal(product) {
    const list = getUserProducts();
    list.unshift(product);
    localStorage.setItem(USER_PRODUCTS_KEY, JSON.stringify(list.slice(0, 100)));
}
 
async function handleSubmit(e) {
    e.preventDefault();
 
    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;
    const priceRaw = document.getElementById("product-price").value;
    const desc = document.getElementById("product-desc").value.trim();
    const location = document.getElementById("product-location").value.trim() || "Toàn quốc";
    const image = document.getElementById("product-image").value.trim();
    const checkedAds = document.querySelector('input[name="ads-package"]:checked');
    const adsPackage = checkedAds ? checkedAds.value : "basic";
 
    if (!name || !category || !priceRaw || !desc || !image) {
        showToast("Vui lòng điền đầy đủ các trường bắt buộc (*).", "error");
        return;
    }
    const price = parseInt(priceRaw, 10);
    if (isNaN(price) || price < 0) {
        showToast("Giá bán không hợp lệ.", "error");
        return;
    }
    if (!image.startsWith("http")) {
        showToast("Đường dẫn ảnh phải bắt đầu bằng http(s).", "error");
        return;
    }
 
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Đang đăng...";
    }
 
    const id = Date.now();
    const nowIso = new Date().toISOString();
    const categoryLabel = CATEGORY_LABELS[category] || "Khác";
    const priceString = `${price.toLocaleString("vi-VN")} đ`;
    const sellerName = currentUser ? (currentUser.displayName || currentUser.email || "Người bán") : "Người bán";
    const product = {
        id: id,
        ad_id: id,
        name: name,
        category: category,
        categoryName: categoryLabel,
        price: price,
        priceString: priceString,
        description: desc,
        location: location,
        image: image,
        rating: 5,
        adsPackage: adsPackage,
        isUserProduct: true,
        sellerId: currentUser ? currentUser.uid : "anonymous",
        sellerEmail: currentUser ? currentUser.email : "",
        createdAt: nowIso,
        _postDate: nowIso,
        // Trường tương thích trang chi tiết (product.js dùng schema Chợ Tốt)
        subject: name,
        body: desc,
        price_string: priceString,
        category_name: categoryLabel,
        region_name: location,
        account_name: sellerName,
        images: [image],
        list_time: id
    };
 
    // Luôn lưu vào localStorage để hiển thị ngay trên web
    saveUserProductLocal(product);
 
    // Đăng lên "API" (Firestore) — chạy ngầm, không chặn nếu lỗi
    try {
        if (db) {
            await db.collection("products").doc(String(id)).set({
                ...product,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    } catch (err) {
        console.warn("Không lưu được lên Firestore (vẫn hiển thị từ localStorage):", err && err.message);
    }
 
    showToast("Đăng sản phẩm thành công! Đang chuyển về trang chủ...", "success");
    setTimeout(() => {
        window.location.href = "index.html?mode=site&posted=1";
    }, 1200);
}
 