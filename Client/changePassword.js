import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEF-miiOOQ-yb42KTGYozNjUY8zImq2Ec",
    authDomain: "lesson3-b336e.firebaseapp.com",
    projectId: "lesson3-b336e",
    storageBucket: "lesson3-b336e.firebasestorage.app",
    messagingSenderId: "757879338973",
    appId: "1:757879338973:web:431390ad9fee86d23aa834",
    measurementId: "G-DQ1BM8DWMD"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const PROFILE_KEY = "chototProfileData";

let currentUser = null;
onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("change-pw-btn");
    const currentInput = document.getElementById("current-password");
    const newInput = document.getElementById("new-password");
    const confirmInput = document.getElementById("confirm-password");
    const messageBox = document.getElementById("change-pw-message");

    if (!btn) return;

    function showMessage(text, type) {
        if (!messageBox) return;
        messageBox.textContent = text;
        messageBox.className = `change-pw-message change-pw-message--${type} visible`;
    }

    function clearMessage() {
        if (!messageBox) return;
        messageBox.className = "change-pw-message";
        messageBox.textContent = "";
    }

    async function handleChangePassword() {
        clearMessage();

        const current = currentInput.value;
        const next = newInput.value;
        const confirm = confirmInput.value;

        if (!current || !next || !confirm) {
            showMessage("Vui lòng điền đầy đủ cả ba ô mật khẩu.", "error");
            return;
        }
        if (next.length < 6) {
            showMessage("Mật khẩu mới phải có ít nhất 6 ký tự.", "error");
            return;
        }
        if (next !== confirm) {
            showMessage("Mật khẩu mới nhập lại không khớp.", "error");
            return;
        }
        if (next === current) {
            showMessage("Mật khẩu mới phải khác mật khẩu hiện tại.", "error");
            return;
        }

        const user = currentUser || auth.currentUser;
        if (!user || !user.email) {
            showMessage("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", "error");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
            return;
        }

        btn.disabled = true;
        btn.textContent = "ĐANG CẬP NHẬT...";

        try {
            const credential = EmailAuthProvider.credential(user.email, current);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, next);

            showMessage("Đổi mật khẩu thành công! Đang đăng xuất, vui lòng đăng nhập lại bằng mật khẩu mới...", "success");

            sessionStorage.setItem("authNotice", "Đổi mật khẩu thành công! Vui lòng đăng nhập lại bằng mật khẩu mới.");
            localStorage.removeItem(PROFILE_KEY);

            await signOut(auth);

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1800);
        } catch (error) {
            let msg = "Đổi mật khẩu thất bại. Vui lòng thử lại.";
            if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                msg = "Mật khẩu hiện tại không đúng.";
            } else if (error.code === "auth/weak-password") {
                msg = "Mật khẩu mới quá yếu (cần ít nhất 6 ký tự).";
            } else if (error.code === "auth/too-many-requests") {
                msg = "Bạn đã thử quá nhiều lần. Vui lòng thử lại sau.";
            } else if (error.code === "auth/requires-recent-login") {
                msg = "Vui lòng đăng nhập lại rồi thử đổi mật khẩu.";
            }
            showMessage(msg, "error");
            btn.disabled = false;
            btn.textContent = "CẬP NHẬT";
        }
    }

    btn.addEventListener("click", handleChangePassword);
    [currentInput, newInput, confirmInput].forEach((input) => {
        if (!input) return;
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleChangePassword();
        });
    });
});
