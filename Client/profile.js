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

document.addEventListener("DOMContentLoaded", function () {
    
    // --- KHAI BÁO CÁC BIẾN TAB ---
    const tabButtons = document.querySelectorAll(".nav-tab-btn[data-target]");
    const tabPanels = document.querySelectorAll(".security-tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));

            this.classList.add("active");
            const targetId = this.getAttribute("data-target");
            const activePanel = document.getElementById(targetId);
            if (activePanel) activePanel.classList.add("active");
        });
    });

    // --- LOGIC HỆ THỐNG BẢO MẬT ---
    const switchOtpMail = document.getElementById("switch-otp-mail");
    const switchGoogleAuth = document.getElementById("switch-google-auth");
    const gaDrawer = document.getElementById("google-authenticator-drawer");
    const txtSecretKey = document.getElementById("txt-secret-key");
    const dynamicGaQr = document.getElementById("dynamic-ga-qr");
    const inputOtpToken = document.getElementById("input-otp-token");
    const verifyOtpAction = document.getElementById("verify-otp-action");
    const submitSecuritySettings = document.getElementById("submit-security-settings");

    // Tạo chuỗi base32 giả lập khóa private
    function generateBase32Secret() {
        const set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let out = "";
        for (let i = 0; i < 16; i++) {
            out += set.charAt(Math.floor(Math.random() * set.length));
        }
        return out;
    }

    if (switchGoogleAuth) {
        switchGoogleAuth.addEventListener("change", function () {
            if (this.checked) {
                // Tắt đồng bộ OTP Mail nếu có bật
                if (switchOtpMail) switchOtpMail.checked = false;

                const secret = generateBase32Secret();
                txtSecretKey.innerText = secret;

                // Tích hợp sinh chuỗi liên kết thiết bị quét QR
                const account = "vugiaken@gmail.com";
                const uri = `otpauth://totp/MarketingHub:${account}?secret=${secret}&issuer=MarketingHub`;
                dynamicGaQr.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(uri)}&choe=UTF-8`;

                // Hiển thị ngăn kéo mượt mà
                gaDrawer.classList.add("expanded");
            } else {
                gaDrawer.classList.remove("expanded");
                inputOtpToken.value = "";
            }
        });
    }

    if (switchOtpMail) {
        switchOtpMail.addEventListener("change", function () {
            if (this.checked && switchGoogleAuth && switchGoogleAuth.checked) {
                switchGoogleAuth.checked = false;
                gaDrawer.classList.remove("expanded");
            }
        });
    }

    if (verifyOtpAction) {
        verifyOtpAction.addEventListener("click", function () {
            const val = inputOtpToken.value.trim();
            if (val.length === 6 && !isNaN(val)) {
                alert("Xác thực ứng dụng thành công! Đã đồng bộ tài khoản với thiết bị Google Authenticator của bạn.");
                gaDrawer.classList.remove("expanded");
            } else {
                alert("Vui lòng điền chuỗi token 6 chữ số hợp lệ từ ứng dụng Authenticator.");
            }
        });
    }

    if (submitSecuritySettings) {
        submitSecuritySettings.addEventListener("click", function () {
            alert("Hệ thống cấu hình Client: Đã lưu các thiết lập thay đổi trạng thái bảo mật của bạn.");
        });
    }

    // --- POPUP ĐĂNG XUẤT ---
    const triggerLogoutModal = document.getElementById("trigger-logout-modal");
    const globalLogoutModal = document.getElementById("globalLogoutModal");
    const btnCancelExit = document.getElementById("btn-cancel-exit");
    const btnConfirmExit = document.getElementById("btn-confirm-exit");

    if (triggerLogoutModal && globalLogoutModal) {
        triggerLogoutModal.addEventListener("click", function (e) {
            e.preventDefault();
            globalLogoutModal.classList.add("visible");
        });
        if (btnCancelExit) {
            btnCancelExit.addEventListener("click", function () {
                globalLogoutModal.classList.remove("visible");
            });
        }
        globalLogoutModal.addEventListener("click", function (e) {
            if (e.target === globalLogoutModal) globalLogoutModal.classList.remove("visible");
        });
    }
});