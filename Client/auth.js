import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Firebase config
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

// Admin config
const ADMIN_PASSCODE = '27092012Ken';
const ADMIN_DEVICE_KEY = 'adminDevice_' + btoa(navigator.userAgent);

// Check if device is admin
function isAdminDevice() {
    return localStorage.getItem(ADMIN_DEVICE_KEY) === 'true';
}

// Set device as admin
function setAdminDevice() {
    localStorage.setItem(ADMIN_DEVICE_KEY, 'true');
}

// Remove admin from device
function removeAdminDevice() {
    localStorage.removeItem(ADMIN_DEVICE_KEY);
}

// Matrix effect
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrix-bg');
    const columns = 25;
    const rows = 20;

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 40}px`;
        column.style.animationDuration = `${Math.random() * 3 + 3}s`;
        column.style.animationDelay = `${Math.random() * 2}s`;

        let text = '';
        for (let j = 0; j < rows; j++) {
            text += Math.random() > 0.5 ? '0' : '1';
            text += '<br>';
        }
        column.innerHTML = text;
        matrixBg.appendChild(column);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 4000);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Login handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const btn = event.target.querySelector('.btn-submit');
    
    // Validation
    if (!email || !password) {
        showNotification('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Email không hợp lệ', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return;
    }
    
    // Loading state
    btn.disabled = true;
    btn.classList.add('loading');
    
    // Sign in
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Add admin role if device is admin
            if (isAdminDevice()) {
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, { isAdmin: true }, { merge: true });
            }

            const userRef = doc(db, 'users', user.uid);
            let savedProfile = {
                id: user.uid,
                name: 'Khách',
                email: user.email || email,
                phone: '',
                nationality: 'VN',
                phoneVerified: false,
                address: 'Chưa cập nhật',
                balance: 0,
                isLoggedIn: true
            };

            try {
                const userSnapshot = await getDoc(userRef);
                if (userSnapshot.exists()) {
                    const data = userSnapshot.data();
                    savedProfile = {
                        ...savedProfile,
                        name: data.name || savedProfile.name,
                        email: data.email || savedProfile.email,
                        phone: data.phone || savedProfile.phone,
                        nationality: data.nationality || savedProfile.nationality,
                        phoneVerified: data.phoneVerified || savedProfile.phoneVerified,
                        address: data.address || savedProfile.address,
                        balance: data.wallet || savedProfile.balance
                    };
                }
            } catch (err) {
                console.warn('Không thể đọc profile từ Firestore:', err.message);
            }

            localStorage.setItem('chototProfileData', JSON.stringify(savedProfile));

            showNotification('Đăng nhập thành công! Đang chuyển hướng...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch((error) => {
            let errorMsg = 'Đăng nhập thất bại';
            
            if (error.code === 'auth/user-not-found') {
                errorMsg = 'Tài khoản không tồn tại';
            } else if (error.code === 'auth/wrong-password') {
                errorMsg = 'Mật khẩu không chính xác';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'Email không hợp lệ';
            } else if (error.code === 'auth/user-disabled') {
                errorMsg = 'Tài khoản đã bị vô hiệu hóa';
            } else if (error.code === 'auth/too-many-requests') {
                errorMsg = 'Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau';
            }
            
            showNotification(errorMsg, 'error');
            btn.disabled = false;
            btn.classList.remove('loading');
        });
}

// Signup handler
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const btn = event.target.querySelector('.btn-submit');
    
    // Validation
    if (!name || !email || !phone || !address || !password || !passwordConfirm) {
        showNotification('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Email không hợp lệ', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return;
    }
    
    if (phone.length < 10) {
        showNotification('Số điện thoại không hợp lệ', 'error');
        return;
    }
    
    // Loading state
    btn.disabled = true;
    btn.classList.add('loading');
    
    // Create user
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            
            // Save user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                phone: phone,
                address: address,
                wallet: 0,
                role: 'free',  // Default role for new users
                isAdmin: isAdminDevice(), // Add admin status from device
                membershipStatus: 'active',
                membershipStartDate: serverTimestamp(),
                membershipEndDate: null,
                createdAt: serverTimestamp(),
                stats: {
                    listingsCreated: 0,
                    listingsActive: 0,
                    totalSales: 0,
                    totalRevenue: 0,
                    rating: 0,
                    reviewCount: 0
                }
            });

            localStorage.setItem('chototProfileData', JSON.stringify({
                id: user.uid,
                name: name,
                email: email,
                phone: phone,
                nationality: 'VN',
                phoneVerified: false,
                address: address,
                balance: 0,
                isLoggedIn: true
            }));
            
            showNotification('Đăng ký thành công! Đang chuyển hướng...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch((error) => {
            let errorMsg = 'Đăng ký thất bại';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMsg = 'Email đã được sử dụng';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'Email không hợp lệ';
            } else if (error.code === 'auth/weak-password') {
                errorMsg = 'Mật khẩu quá yếu';
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMsg = 'Đăng ký bị tắt. Vui lòng liên hệ admin';
            }
            
            showNotification(errorMsg, 'error');
            btn.disabled = false;
            btn.classList.remove('loading');
        });
}

// Admin login handler
function handleAdminLogin(event) {
    event.preventDefault();
    
    const passcode = document.getElementById('adminPasscode').value;
    const btn = event.target.querySelector('.btn-submit');
    
    if (!passcode) {
        showNotification('Vui lòng nhập mật khẩu', 'error');
        return;
    }
    
    btn.disabled = true;
    btn.classList.add('loading');
    
    if (passcode === ADMIN_PASSCODE) {
        setAdminDevice();
        showNotification('✓ Thiết bị này đã được kích hoạt quyền Admin!', 'success');
        setTimeout(() => {
            closeAdminModal();
            document.getElementById('adminPasscode').value = '';
        }, 1500);
        btn.disabled = false;
        btn.classList.remove('loading');
    } else {
        showNotification('✗ Mật khẩu không chính xác', 'error');
        btn.disabled = false;
        btn.classList.remove('loading');
    }
}

// Show admin modal
function showAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('adminPasscode').focus();
    }
}

// Close admin modal
function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Make functions global
window.showAdminModal = showAdminModal;
window.closeAdminModal = closeAdminModal;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create matrix effect
    createMatrixEffect();
    
    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Handle signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Enter key support
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const form = input.closest('form');
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
});