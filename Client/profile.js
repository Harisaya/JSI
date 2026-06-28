const PROFILE_KEY = 'chototProfileData';
const COUNTRY_LABELS = {
    VN: 'Việt Nam (+84)',
    US: 'Mỹ (+1)',
    IN: 'Ấn Độ (+91)',
    SG: 'Singapore (+65)'
};

const defaultProfile = {
    id: `guest-${Math.random().toString(36).slice(2, 10)}`,
    name: 'Khách',
    email: 'guest@chopin.vn',
    phone: '',
    nationality: 'VN',
    role: 'free',
    membershipStatus: 'inactive',
    membershipStartDate: null,
    membershipEndDate: null,
    stats: {
        listingsActive: 0,
        totalSales: 0,
        totalRevenue: 0,
        rating: 0
    },
    phoneVerified: false,
    address: 'Chưa cập nhật',
    balance: 0,
    isLoggedIn: false,
    phoneCode: '',
    phoneCodeSent: false
};

function normalizePhone(value) {
    return String(value || '').replace(/\D/g, '');
}

function validatePhoneNumber(country, value) {
    const digits = normalizePhone(value);
    if (!digits) {
        return { valid: false, message: 'Số điện thoại không được để trống.' };
    }

    if (country === 'VN') {
        if (digits.startsWith('0')) {
            if (digits.length === 10) {
                return { valid: true, message: '' };
            }
            return { valid: false, message: 'Số Việt Nam có đầu 0 phải đủ 10 số.' };
        }

        if (digits.length === 9) {
            return { valid: true, message: '' };
        }

        if (digits.length === 10) {
            return { valid: false, message: 'Số Việt Nam bỏ 0 chỉ được nhập 9 số.' };
        }

        return { valid: false, message: 'Số điện thoại không tồn tại hoặc sai định dạng.' };
    }

    if (digits.length < 7 || digits.length > 15) {
        return { valid: false, message: 'Số điện thoại không tồn tại hoặc sai định dạng.' };
    }

    return { valid: true, message: '' };
}

function formatPhone(country, value) {
    const digits = normalizePhone(value);
    if (!digits) return '';

    if (country === 'VN') {
        if (digits.startsWith('0') && digits.length === 10) {
            return digits;
        }
        if (digits.length === 9) {
            return '0' + digits;
        }
    }

    return digits;
}

function getProfileData() {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...defaultProfile };

    try {
        const parsed = JSON.parse(raw);
        return { ...defaultProfile, ...parsed, id: parsed.id || defaultProfile.id };
    } catch (e) {
        return { ...defaultProfile };
    }
}

function saveProfileData(data) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

function getCountryLabel(country) {
    return COUNTRY_LABELS[country] || country;
}

function updateProfileUI() {
    const profile = state.profile;
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileRole = document.getElementById('profileRole');
    const profileId = document.getElementById('profileId');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhoneDisplay = document.getElementById('profilePhoneDisplay');
    const profilePhoneStatus = document.getElementById('profilePhoneStatus');
    const profileNationality = document.getElementById('profileNationalityDisplay');
    const profileAddress = document.getElementById('profileAddress');
    const profileBalance = document.getElementById('profileBalance');

    if (profileAvatar) {
        const initials = (profile.name || 'Khách').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'KH';
        profileAvatar.textContent = initials;
    }
    if (profileName) profileName.textContent = profile.name || 'Khách';
    if (profileRole) profileRole.textContent = profile.isLoggedIn ? 'Người dùng đã đăng nhập' : 'Tài khoản khách';
    if (profileId) profileId.textContent = profile.id;
    if (profileEmail) profileEmail.textContent = profile.email || 'Chưa cập nhật';
    if (profilePhoneDisplay) profilePhoneDisplay.textContent = profile.phone ? formatPhone(profile.nationality, profile.phone) : 'Chưa cập nhật';
    if (profilePhoneStatus) profilePhoneStatus.textContent = profile.phone ? (profile.phoneVerified ? 'Đã xác thực' : 'Chưa xác thực') : 'Chưa cập nhật';
    if (profileNationality) profileNationality.textContent = getCountryLabel(profile.nationality);
    if (profileAddress) profileAddress.textContent = profile.address || 'Chưa cập nhật';
    if (profileBalance) profileBalance.textContent = `${Number(profile.balance || 0).toLocaleString('vi-VN')} đ`;
    const profileRoleType = document.getElementById('profileRoleType');
    if (profileRoleType) profileRoleType.textContent = profile.role || 'free';

    const profilePhoneMini = document.getElementById('profilePhoneMini');
    const profilePhoneStatusMini = document.getElementById('profilePhoneStatusMini');
    const profileBalanceMini = document.getElementById('profileBalanceMini');
    const profileNationalityMini = document.getElementById('profileNationalityMini');
    const changeBtn = document.getElementById('changePhoneBtn');
    const verifyBtn = document.getElementById('verifyPhoneBtn');
    const profilePhoneHint = document.getElementById('profilePhoneHint');

    if (profilePhoneMini) profilePhoneMini.textContent = profile.phone ? formatPhone(profile.nationality, profile.phone) : 'Chưa cập nhật';
    if (profilePhoneStatusMini) profilePhoneStatusMini.textContent = profile.phone ? (profile.phoneVerified ? 'Đã xác thực' : 'Chưa xác thực') : 'Chưa cập nhật';
    if (profileBalanceMini) profileBalanceMini.textContent = `${Number(profile.balance || 0).toLocaleString('vi-VN')} đ`;
    if (profileNationalityMini) profileNationalityMini.textContent = getCountryLabel(profile.nationality);

    if (changeBtn) {
        changeBtn.textContent = profile.phone ? 'Thay đổi / Thêm số' : 'Thêm số điện thoại';
    }
    if (verifyBtn) {
        verifyBtn.disabled = !profile.phone;
        verifyBtn.textContent = profile.phone ? 'Xác thực số điện thoại' : 'Xác thực (thêm số trước)';
    }
    if (profilePhoneHint) {
        profilePhoneHint.classList.toggle('hidden', !!profile.phone);
    }
}

function showSection(id, visible) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('hidden', !visible);
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3500);
}

function openPhoneEditor() {
    const select = document.getElementById('nationalitySelect');
    const input = document.getElementById('phoneInput');
    if (select) select.value = state.profile.nationality;
    if (input) input.value = state.profile.phone ? formatPhone(state.profile.nationality, state.profile.phone) : '';
    showSection('phoneEditor', true);
}

function closePhoneEditor() {
    showSection('phoneEditor', false);
}

function openVerificationPanel(message) {
    const info = document.getElementById('verificationInfo');
    if (info) info.textContent = message || 'Nhập mã xác thực để hoàn tất.';
    showSection('verificationPanel', true);
}

function closeVerificationPanel() {
    showSection('verificationPanel', false);
}

function handleSavePhone() {
    const select = document.getElementById('nationalitySelect');
    const input = document.getElementById('phoneInput');
    if (!select || !input) return;

    const nationality = select.value;
    const phoneValue = input.value.trim();
    const validation = validatePhoneNumber(nationality, phoneValue);

    if (!validation.valid) {
        showNotification(validation.message, 'error');
        return;
    }

    state.profile = {
        ...state.profile,
        nationality,
        phone: normalizePhone(phoneValue),
        phoneVerified: false,
        phoneCodeSent: false,
        phoneCode: ''
    };
    saveProfileData(state.profile);
    updateProfileUI();
    closePhoneEditor();
    closeVerificationPanel();
    showNotification('Số điện thoại mới đã lưu. Vui lòng xác thực.', 'success');
}

function handleSendVerification() {
    if (!state.profile.phone) {
        showNotification('Vui lòng thêm số điện thoại trước khi xác thực.', 'error');
        return;
    }

    const validation = validatePhoneNumber(state.profile.nationality, state.profile.phone);
    if (!validation.valid) {
        showNotification(validation.message, 'error');
        return;
    }

    state.profile.phoneCode = Math.floor(100000 + Math.random() * 900000).toString();
    state.profile.phoneCodeSent = true;
    state.profile.phoneVerified = false;
    saveProfileData(state.profile);
    updateProfileUI();
    openVerificationPanel(`Mã xác thực đã gửi tới ${formatPhone(state.profile.nationality, state.profile.phone)}. Mã thử: ${state.profile.phoneCode}`);
    showNotification('Tin nhắn xác thực đã được gửi. Mã thử hiển thị trong giao diện.', 'success');
}

function handleConfirmVerification() {
    const input = document.getElementById('verificationCodeInput');
    if (!input) return;
    const code = input.value.trim();
    if (!state.profile.phoneCodeSent || !state.profile.phoneCode) {
        showNotification('Vui lòng gửi mã xác thực trước.', 'error');
        return;
    }

    if (code === state.profile.phoneCode) {
        state.profile = {
            ...state.profile,
            phoneVerified: true,
            phoneCode: '',
            phoneCodeSent: false
        };
        saveProfileData(state.profile);
        updateProfileUI();
        closeVerificationPanel();
        showNotification('Số điện thoại đã xác thực thành công.', 'success');
        return;
    }

    showNotification('Mã xác thực không chính xác.', 'error');
}

function handleResendVerification() {
    handleSendVerification();
}

function handleLogout() {
    localStorage.removeItem(PROFILE_KEY);
    window.location.href = 'login.html';
}

const state = {
    profile: getProfileData()
};

function initProfilePage() {
    updateProfileUI();

    const verifyBtn = document.getElementById('verifyPhoneBtn');
    const changeBtn = document.getElementById('changePhoneBtn');
    const saveBtn = document.getElementById('savePhoneBtn');
    const cancelBtn = document.getElementById('cancelPhoneBtn');
    const confirmBtn = document.getElementById('confirmVerifyBtn');
    const resendBtn = document.getElementById('resendCodeBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (verifyBtn) verifyBtn.addEventListener('click', handleSendVerification);
    if (changeBtn) changeBtn.addEventListener('click', openPhoneEditor);
    if (saveBtn) saveBtn.addEventListener('click', handleSavePhone);
    if (cancelBtn) cancelBtn.addEventListener('click', closePhoneEditor);
    if (confirmBtn) confirmBtn.addEventListener('click', handleConfirmVerification);
    if (resendBtn) resendBtn.addEventListener('click', handleResendVerification);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    if (!state.profile.isLoggedIn) {
        showSection('profileCard', false);
        showSection('phoneEditor', false);
        showSection('verificationPanel', false);
        showSection('authPrompt', true);
    } else {
        showSection('profileCard', true);
        showSection('authPrompt', false);
        closePhoneEditor();
        closeVerificationPanel();
    }
}

document.addEventListener('DOMContentLoaded', initProfilePage);

// Giả định bạn đã import cấu hình firebase trước đó
document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. LOGIC CHUYỂN ĐỔI QUA LẠI GIỮA CÁC TAB TAB ---
    const menuButtons = document.querySelectorAll(".menu-tab-btn[data-target]");
    const contentPanels = document.querySelectorAll(".profile-tab-panel");

    menuButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Gỡ bỏ class active cũ
            menuButtons.forEach(b => b.classList.remove("active"));
            contentPanels.forEach(p => p.classList.remove("active"));

            // Thêm active cho Tab vừa được kích hoạt
            this.classList.add("active");
            const targetId = this.getAttribute("data-target");
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

    // --- LOGIC HIỂN THỊ POPUP ĐĂNG XUẤT CHUẨN ---
    const logoutSidebarBtn = document.getElementById("logout-sidebar-btn");
    const modalLogoutOverlay = document.getElementById("modalLogoutOverlay");
    const confirmLogoutAction = document.getElementById("confirmLogoutAction");
    const cancelLogoutAction = document.getElementById("cancelLogoutAction");

    if (logoutSidebarBtn && modalLogoutOverlay) {
        logoutSidebarBtn.addEventListener("click", () => modalLogoutOverlay.classList.add("visible"));
    }
    if (cancelLogoutAction && modalLogoutOverlay) {
        cancelLogoutAction.addEventListener("click", () => modalLogoutOverlay.classList.remove("visible"));
    }
    if (modalLogoutOverlay) {
        modalLogoutOverlay.addEventListener("click", (e) => {
            if (e.target === modalLogoutOverlay) modalLogoutOverlay.classList.remove("visible");
        });
    }
    if (confirmLogoutAction) {
        confirmLogoutAction.addEventListener("click", function () {
            if (typeof firebase !== "undefined" && firebase.auth) {
                firebase.auth().signOut().then(() => {
                    window.location.href = "main.html";
                });
            } else {
                handleLogout();
            }
        });
    }

    if (typeof firebase === "undefined" || !firebase.auth) {
        return;
    }

    // --- 2. LẤY DỮ LIỆU ĐỘNG TỪ FIREBASE ĐỔ VÀO INPUTS ---
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            
            // Tham chiếu tới Node dữ liệu user trên Realtime Database
            const userDatabaseRef = firebase.database().ref('users/' + uid);
            userDatabaseRef.on('value', (snapshot) => {
                const firebaseData = snapshot.val() || {};

                // Đổ dữ liệu số dư lên Khối Ví của tôi
                const currentWallet = firebaseData.wallet || 0;
                const totalDeposit = firebaseData.totalDeposit || 0;
                const totalUsed = firebaseData.totalUsed || 0;

                document.getElementById("stat-wallet").innerText = currentWallet.toLocaleString('vi-VN') + "đ";
                document.getElementById("stat-total-deposit").innerText = totalDeposit.toLocaleString('vi-VN') + "đ";
                document.getElementById("stat-total-used").innerText = totalUsed.toLocaleString('vi-VN') + "đ";

                // Điền thông tin vào các Input thuộc Khối Hồ sơ của bạn
                document.getElementById("info-username").value = firebaseData.username || user.displayName || "ddddd";
                document.getElementById("info-email").value = user.email || "Chưa cập nhật";
                document.getElementById("info-phone").value = firebaseData.phone || "Chưa cập nhật";
                document.getElementById("info-fullname").value = firebaseData.fullname || "Chưa cập nhật";
                document.getElementById("info-telegram").value = firebaseData.telegramId || "Chưa cập nhật";
                
                // Điền thời gian đăng ký và đăng nhập hệ thống
                document.getElementById("info-created-at").value = firebaseData.createdAt || "2026-06-24 11:42:42";
                document.getElementById("info-last-login").value = firebaseData.lastLogin || "2026-06-24 11:42:42";
            });
        } else {
            // Nếu chưa login thì chuyển hướng ngay về trang đăng nhập chính
            window.location.href = "main.html";
        }
    });

    // --- 3. ĐÓNG / MỞ KHỐI GOOGLE AUTHENTICATOR ---
    const switchGoogleAuth = document.getElementById("switch-google-auth");
    const switchOtpMail = document.getElementById("switch-otp-mail");
    const gaDrawerArea = document.getElementById("ga-drawer-area");
    const gaSecretString = document.getElementById("ga-secret-string");
    const gaQrcodeImage = document.getElementById("ga-qrcode-image");

    if (switchGoogleAuth) {
        switchGoogleAuth.addEventListener("change", function () {
            if (this.checked) {
                // Tắt DTP Mail nếu bật Google Auth (như yêu cầu đề bài)
                if (switchOtpMail) switchOtpMail.checked = false;
                
                const mockSecret = "JAYSTORES2FAKEYSECRET";
                gaSecretString.innerText = mockSecret;
                const qrUrl = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=otpauth://totp/JayStores?secret=${mockSecret}&choe=UTF-8`;
                gaQrcodeImage.src = qrUrl;

                gaDrawerArea.classList.add("expanded");
            } else {
                gaDrawerArea.classList.remove("expanded");
            }
        });
    }
});

// --- NHẬT KÝ HOẠT ĐỘNG ---
function getActivityLogs() {
    try {
        const stored = JSON.parse(localStorage.getItem("activityLogs"));
        if (Array.isArray(stored) && stored.length) return stored;
    } catch (e) {
        // Bỏ qua dữ liệu hỏng, dùng dữ liệu mẫu bên dưới
    }
    return [
        { time: "2026-06-24 11:42:42", action: "Create an account", ip: "203.113.1.92" },
        { time: "2026-06-24 11:45:10", action: "Login", ip: "203.113.1.92" },
        { time: "2026-06-25 09:12:05", action: "Update profile", ip: "171.244.2.18" },
        { time: "2026-06-25 22:30:48", action: "Change password", ip: "171.244.2.18" },
        { time: "2026-06-26 08:05:33", action: "Login", ip: "118.69.7.220" },
        { time: "2026-06-27 14:51:09", action: "Logout", ip: "118.69.7.220" }
    ];
}

function maskActivityIp(ip) {
    const parts = String(ip).split(".");
    if (parts.length === 4) return `***.***.${parts[2]}.${parts[3]}`;
    return ip;
}

function initActivityLog() {
    const tbody = document.getElementById("activity-log-body");
    if (!tbody) return;

    const actionSelect = document.getElementById("filter-action");
    const ipInput = document.getElementById("filter-ip");
    const dateInput = document.getElementById("filter-date");
    const searchBtn = document.getElementById("activity-search-btn");
    const clearBtn = document.getElementById("activity-clear-btn");
    const showSelect = document.getElementById("activity-show-select");
    const sortSelect = document.getElementById("activity-sort-select");
    const resultsInfo = document.getElementById("activity-results-info");

    const allLogs = getActivityLogs();

    function render() {
        const action = actionSelect.value;
        const ip = ipInput.value.trim().toLowerCase();
        const date = dateInput.value;
        const sort = sortSelect.value;
        const limit = parseInt(showSelect.value, 10) || 10;

        let logs = allLogs.filter((log) => {
            if (action && log.action !== action) return false;
            if (ip && !String(log.ip).toLowerCase().includes(ip)) return false;
            if (date && !String(log.time).startsWith(date)) return false;
            return true;
        });

        if (sort === "newest") {
            logs = logs.slice().sort((a, b) => b.time.localeCompare(a.time));
        } else if (sort === "oldest") {
            logs = logs.slice().sort((a, b) => a.time.localeCompare(b.time));
        }

        const total = logs.length;
        const visible = logs.slice(0, limit);

        tbody.innerHTML = "";
        if (!visible.length) {
            const tr = document.createElement("tr");
            tr.className = "activity-empty-row";
            const td = document.createElement("td");
            td.colSpan = 3;
            td.textContent = "Không tìm thấy hoạt động nào.";
            tr.appendChild(td);
            tbody.appendChild(tr);
        } else {
            visible.forEach((log) => {
                const tr = document.createElement("tr");

                const timeTd = document.createElement("td");
                timeTd.textContent = log.time;
                const actionTd = document.createElement("td");
                actionTd.textContent = log.action;
                const ipTd = document.createElement("td");
                ipTd.textContent = maskActivityIp(log.ip);

                tr.appendChild(timeTd);
                tr.appendChild(actionTd);
                tr.appendChild(ipTd);
                tbody.appendChild(tr);
            });
        }

        resultsInfo.textContent = `Showing ${visible.length} of ${total} Results`;
    }

    if (searchBtn) searchBtn.addEventListener("click", render);
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            actionSelect.value = "";
            ipInput.value = "";
            dateInput.value = "";
            sortSelect.value = "all";
            showSelect.value = "10";
            render();
        });
    }
    if (showSelect) showSelect.addEventListener("change", render);
    if (sortSelect) sortSelect.addEventListener("change", render);
    if (ipInput) {
        ipInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") render();
        });
    }

    render();
}

document.addEventListener("DOMContentLoaded", initActivityLog);

// --- BIẾN ĐỘNG SỐ DƯ ---
function getBalanceHistory() {
    try {
        const stored = JSON.parse(localStorage.getItem("balanceHistory"));
        if (Array.isArray(stored) && stored.length) return stored;
    } catch (e) {
        // Bỏ qua dữ liệu hỏng, dùng dữ liệu mẫu bên dưới
    }
    return [
        { time: "2026-06-24 11:50:00", before: 0, change: 100000, after: 100000, reason: "Nạp tiền vào ví" },
        { time: "2026-06-25 14:20:11", before: 100000, change: -45000, after: 55000, reason: "Thanh toán đơn hàng #1024" },
        { time: "2026-06-26 09:05:42", before: 55000, change: 200000, after: 255000, reason: "Nạp tiền vào ví" },
        { time: "2026-06-26 19:30:08", before: 255000, change: -120000, after: 135000, reason: "Thanh toán đơn hàng #1031" },
        { time: "2026-06-27 08:15:33", before: 135000, change: 50000, after: 185000, reason: "Hoàn tiền đơn hàng #1031" }
    ];
}

function formatMoney(value) {
    const num = Number(value) || 0;
    const sign = num > 0 ? "+" : "";
    return `${sign}${num.toLocaleString("vi-VN")}đ`;
}

function initBalanceHistory() {
    const tbody = document.getElementById("balance-log-body");
    if (!tbody) return;

    const reasonInput = document.getElementById("balance-filter-reason");
    const dateInput = document.getElementById("balance-filter-date");
    const searchBtn = document.getElementById("balance-search-btn");
    const clearBtn = document.getElementById("balance-clear-btn");
    const showSelect = document.getElementById("balance-show-select");
    const sortSelect = document.getElementById("balance-sort-select");
    const resultsInfo = document.getElementById("balance-results-info");

    const allRows = getBalanceHistory();

    function render() {
        const reason = reasonInput.value.trim().toLowerCase();
        const date = dateInput.value;
        const sort = sortSelect.value;
        const limit = parseInt(showSelect.value, 10) || 10;

        let rows = allRows.filter((row) => {
            if (reason && !String(row.reason).toLowerCase().includes(reason)) return false;
            if (date && !String(row.time).startsWith(date)) return false;
            return true;
        });

        if (sort === "newest") {
            rows = rows.slice().sort((a, b) => b.time.localeCompare(a.time));
        } else if (sort === "oldest") {
            rows = rows.slice().sort((a, b) => a.time.localeCompare(b.time));
        }

        const total = rows.length;
        const visible = rows.slice(0, limit);

        tbody.innerHTML = "";
        if (!visible.length) {
            const tr = document.createElement("tr");
            tr.className = "activity-empty-row";
            const td = document.createElement("td");
            td.colSpan = 5;
            td.innerHTML = '<i class="fas fa-inbox" style="display:block;font-size:32px;color:#cbd5e1;margin-bottom:8px;"></i>Không có dữ liệu';
            tr.appendChild(td);
            tbody.appendChild(tr);
        } else {
            visible.forEach((row) => {
                const tr = document.createElement("tr");

                const timeTd = document.createElement("td");
                timeTd.textContent = row.time;

                const beforeTd = document.createElement("td");
                beforeTd.textContent = (Number(row.before) || 0).toLocaleString("vi-VN") + "đ";

                const changeTd = document.createElement("td");
                changeTd.textContent = formatMoney(row.change);
                changeTd.style.color = (Number(row.change) || 0) >= 0 ? "#16a34a" : "#dc2626";
                changeTd.style.fontWeight = "600";

                const afterTd = document.createElement("td");
                afterTd.textContent = (Number(row.after) || 0).toLocaleString("vi-VN") + "đ";

                const reasonTd = document.createElement("td");
                reasonTd.textContent = row.reason;

                tr.appendChild(timeTd);
                tr.appendChild(beforeTd);
                tr.appendChild(changeTd);
                tr.appendChild(afterTd);
                tr.appendChild(reasonTd);
                tbody.appendChild(tr);
            });
        }

        resultsInfo.textContent = `Showing ${visible.length} of ${total} Results`;
    }

    if (searchBtn) searchBtn.addEventListener("click", render);
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            reasonInput.value = "";
            dateInput.value = "";
            sortSelect.value = "all";
            showSelect.value = "10";
            render();
        });
    }
    if (showSelect) showSelect.addEventListener("change", render);
    if (sortSelect) sortSelect.addEventListener("change", render);
    if (reasonInput) {
        reasonInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") render();
        });
    }

    render();
}

document.addEventListener("DOMContentLoaded", initBalanceHistory);