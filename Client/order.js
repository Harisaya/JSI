import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

    const firebaseConfig = {
    apiKey: "AIzaSyCEF-miiOOQ-yb42KTGYozNjUY8zImq2Ec",
    authDomain: "lesson3-b336e.firebaseapp.com",
    projectId: "lesson3-b336e",
    storageBucket: "lesson3-b336e.firebasestorage.app",
    messagingSenderId: "757879338973",
    appId: "1:757879338973:web:431390ad9fee86d23aa834",
    measurementId: "G-DQ1BM8DWMD"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function renderOrders(orders) {
    const orderList = document.getElementById('orderList');
    if (!orderList) return;

    if (!orders || orders.length === 0) {
        orderList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#7a6d42;">Bạn chưa có đơn hàng nào.</p>';
        return;
    }

    orderList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div style="margin-bottom:10px;">
                <strong>Đơn #${order.id.substring(0, 8)}</strong>
            </div>
            <div class="summary-row">
                <span>Tổng tiền:</span>
                <span>${order.total?.toLocaleString() || 0} đ</span>
            </div>
            <div class="summary-row">
                <span>Trạng thái:</span>
                <span>${order.status || 'pending'}</span>
            </div>
            <div class="summary-row">
                <span>Số sản phẩm:</span>
                <span>${order.items?.length || 0}</span>
            </div>
        </div>
    `).join('');
}

async function loadUserOrders(user) {
    const orderList = document.getElementById('orderList');
    if (!orderList) return;

    try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderOrders(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        showNotification('Không thể tải đơn hàng. Vui lòng thử lại sau.', 'error');
        orderList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#7a6d42;">Đã xảy ra lỗi khi tải đơn hàng.</p>';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const orderList = document.getElementById('orderList');
    if (!orderList) return;

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            orderList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#7a6d42;">Vui lòng <a href="login.html">đăng nhập</a> để xem đơn hàng.</p>';
            return;
        }

        loadUserOrders(user);
    });
});
