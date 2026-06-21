// LANGUAGE MANAGEMENT
// LANGUAGE MANAGEMENT
// LANGUAGE MANAGEMENT



const languageStorageKey = 'chototLanguage';
const languageNames = {
    vi: 'Tiếng Việt',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    zh: '中文',
    ja: '日本語',
    ko: '한국어',
    th: 'ไทย',
    ar: 'العربية'
};

const translations = {
    vi: {
        'page.title': 'Chợ Xịn',
        'nav.home': 'Trang chủ',
        'nav.cart': 'Giỏ',
        'nav.orders': 'Đơn hàng',
        'nav.profile': 'Hồ sơ',
        'nav.role': 'Vai trò',
        'nav.language': 'Ngôn ngữ',
        'auth.login': '🔐 Đăng nhập',
        'auth.signup': '📝 Đăng ký',
        'home.title': 'Chào mừng đến Chợ Xịn',
        'home.desc': 'Chọn một trong hai cách để tiếp tục trên website:',
        'home.goWebsite': 'Đi đến website',
        'home.stay': 'Ở lại và xem thông tin',
        'info.title': 'Thông tin trước khi vào trang chính',
        'info.desc': 'Đây là nơi bạn có thể xem nội dung giới thiệu, hình ảnh sản phẩm và lựa chọn trước khi đăng nhập.',
        'info.card1.title': 'Siêu thị trực tuyến',
        'info.card1.desc': 'Khám phá sản phẩm mới với giao diện tối và hiệu ứng độc đáo.',
        'info.card2.title': 'Đăng nhập nhanh',
        'info.card2.desc': 'Đăng nhập bằng email và mật khẩu để quản lý giỏ hàng ngay.',
        'info.card3.title': 'Thông tin người dùng',
        'info.card3.desc': 'Bạn chưa đăng nhập. Vui lòng đăng nhập hoặc đăng ký để xem thông tin cá nhân.',
        'category.all': '📦 Tất cả',
        'category.electronics': '📱 Điện tử',
        'category.fashion': '👗 Thời trang',
        'category.food': '🍔 Thực phẩm',
        'category.home': '🛋️ Nhà cửa',
        'category.vehicles': '🚗 Xe cộ',
        'category.appliances': '🏠 Đồ gia dụng',
        'category.timeLabel': '⏰ Thời gian:',
        'time.all': 'Tất cả thời gian',
        'time.today': 'Hôm nay',
        'time.yesterday': 'Hôm qua',
        'time.week': 'Tuần trước',
        'time.month': 'Tháng trước',
        'sort.popular': 'Phổ biến nhất',
        'sort.priceLow': 'Giá thấp',
        'sort.priceHigh': 'Giá cao',
        'sort.rating': 'Đánh giá cao',
        'search.placeholder': 'Tìm kiếm sản phẩm...',
        'banner.title': '🛍️ Siêu Thị Trực Tuyến',
        'banner.desc': 'Mua sắm dễ dàng - Giao hàng nhanh',
        'banner.sell': '📣 Bán đồ ngay',
        'empty.title': 'Không tìm thấy sản phẩm',
        'empty.desc': 'Thử tìm kiếm từ khóa khác',
        'about.title': 'Giới thiệu Chợ Xịn',
        'about.desc': 'Chợ Xịn là nền tảng mua bán trực tuyến thân thiện và nhanh gọn cho người Việt.',
        'about.expand': 'Mở rộng',
        'about.content1': 'Chợ Xịn mang đến cho bạn trải nghiệm mua sắm an toàn, dễ dùng, với sản phẩm đa dạng từ đồ công nghệ, thời trang, đồ gia dụng đến hàng tiêu dùng hàng ngày.',
        'about.content2': 'Chúng tôi tập trung vào giao diện nhẹ nhàng, tìm kiếm nhanh và đặt hàng tức thì, giúp bạn tiết kiệm thời gian trong mọi giao dịch.',
        'about.content3': 'Với Chợ Xịn, bạn có thể đăng nhập, duyệt sản phẩm, quản lý đơn hàng và thanh toán dễ dàng trong cùng một nền tảng.',
        'cart.title': '🛒 Giỏ Hàng',
        'cart.summaryTitle': 'Tóm tắt đơn hàng',
        'cart.subtotalLabel': 'Tổng tiền:',
        'cart.shippingLabel': 'Phí giao:',
        'cart.orderFeeLabel': 'Phí đơn hàng:',
        'cart.discountLabel': 'Giảm giá:',
        'cart.totalLabel': 'Tổng cộng:',
        'cart.checkout': 'Đặt hàng',
        'orders.title': '📦 Đơn Hàng Của Tôi',
        'orders.desc': 'Bạn cũng có thể mở trang đơn hàng riêng: Xem order.html',
        'orders.empty': 'Bạn chưa có đơn hàng nào',
        'pay.title': 'Thanh toán',
        'pay.desc': 'Chọn phương thức thanh toán phù hợp và hoàn tất giao dịch một cách nhanh chóng.',
        'pay.option1Title': '1. Ứng dụng thanh toán hỗ trợ',
        'pay.option1Desc': 'Quét mã QR bằng VNPAY, ZaloPay, Momo hoặc ngân hàng của bạn.',
        'pay.qrNote': 'Quét QR để thanh toán ngay.',
        'pay.option2Title': '2. Ví điện tử',
        'pay.option2Desc': 'Chọn ví điện tử VNPAY hoặc các ví liên kết khác.',
        'pay.bankTitle': 'Ngân hàng và thẻ',
        'pay.bankNote': 'Chọn ngân hàng phù hợp để chuyển khoản hoặc thanh toán bằng thẻ.',
        'pay.notesTitle': '3. Ghi chú',
        'pay.note1': 'Hạn mức thanh toán tùy theo ngân hàng/ví.',
        'pay.note2': 'Thanh toán thành công sẽ cập nhật ngay vào đơn hàng.',
        'pay.note3': 'Liên hệ support nếu gặp lỗi trong quá trình thanh toán.',
        'pay.backToHome': 'Quay lại trang chủ',
        'product.back': '← Trở về',
        'product.brand': 'Chợ Xịn',
        'product.subtitle': 'Trang chi tiết sản phẩm',
        'product.detail': 'Mô tả chi tiết',
        'product.specs': 'Thông số chi tiết',
        'product.contactInfo': 'Thông tin liên hệ',
        'product.posted': 'Đã đăng:',
        'product.location': 'Vị trí',
        'product.relatedTitle': 'Gợi ý sản phẩm',
        'product.relatedLoading': 'Đang tải gợi ý...',
        'product.noSuggestions': 'Không có gợi ý phù hợp.',
        'product.errorNotFound': 'Không tìm thấy sản phẩm. Vui lòng quay lại trang trước.',
        'product.errorLoading': 'Lỗi tải sản phẩm:',
        'profile.title': '👤 Hồ sơ người dùng',
        'profile.balanceMini': 'Ví hiện tại',
        'profile.statusMini': 'Trạng thái',
        'profile.phoneMini': 'Số điện thoại',
        'profile.nationalityMini': 'Quốc tịch',
        'profile.userId': 'ID người dùng',
        'profile.email': 'Email',
        'profile.phoneDisplay': 'Số điện thoại',
        'profile.phoneStatus': 'Trạng thái điện thoại',
        'profile.nationality': 'Quốc tịch',
        'profile.roleType': 'Gói hiện tại',
        'profile.address': 'Địa chỉ',
        'profile.verifyPhone': 'Xác thực số điện thoại',
        'profile.changePhone': 'Thay đổi / Thêm số',
        'profile.addPhone': 'Thêm số điện thoại',
        'profile.phoneHint': 'Chưa có số điện thoại? Nhấn “Thay đổi / Thêm số” để nhập và xác thực bằng SMS.',
        'profile.editorTitle': 'Thay đổi số điện thoại',
        'profile.nationalityLabel': 'Quốc tịch',
        'profile.phoneInputLabel': 'Số điện thoại',
        'profile.phonePlaceholder': 'Nhập số điện thoại...',
        'profile.phoneNote': 'Với số Việt Nam: nếu có đầu 0 thì phải đủ 10 số; nếu bỏ 0 thì chỉ được 9 số. Nếu bỏ 0 mà nhập 10 số sẽ báo lỗi.',
        'profile.savePhone': 'Lưu số',
        'profile.cancel': 'Hủy',
        'profile.verifyTitle': 'Xác thực số điện thoại',
        'profile.verifyInfo': 'Nhấn “Xác thực số điện thoại” để nhận mã SMS.',
        'profile.verificationCodeLabel': 'Mã xác thực',
        'profile.confirmVerify': 'Xác nhận mã',
        'profile.resendCode': 'Gửi lại mã',
        'profile.loginPromptTitle': '🔐 Vui lòng đăng nhập',
        'profile.loginPromptDesc': 'Để xem hồ sơ và quản lý thông tin cá nhân',
        'profile.loginButton': 'Đăng nhập',
        'profile.signupPrompt': 'Chưa có tài khoản? Đăng ký ngay',
        'profile.signupLink': 'Đăng ký ngay',
        'profile.phoneSaved': 'Số điện thoại mới đã lưu. Vui lòng xác thực.',
        'profile.addPhoneFirst': 'Vui lòng thêm số điện thoại trước khi xác thực.',
        'profile.verificationSent': 'Tin nhắn xác thực đã được gửi. Mã thử hiển thị trong giao diện.',
        'profile.verificationInstruction': 'Mã xác thực đã gửi tới {phone}. Mã thử: {code}',
        'profile.sendBeforeVerify': 'Vui lòng gửi mã xác thực trước.',
        'profile.verificationSuccess': 'Số điện thoại đã xác thực thành công.',
        'profile.verificationFailed': 'Mã xác thực không chính xác.',
        'role.title': '⭐ Quản lý Role / Membership',
        'role.loginRequiredDesc': 'Đăng nhập để mua role và quản lý gói thành viên.',
        'role.buyRoleError': 'Bạn phải đăng nhập trước khi mua role.',
        'role.rolePurchasedSuccess': 'Bạn đã mua role thành công!',
        'role.rolePurchasedWarning': 'Đã lưu tạm role mặc dù chưa chắc kết nối Firebase thành công.',
        'role.roleChangeError': 'Bạn phải đăng nhập trước khi chuyển role.',
        'role.roleChangedSuccess': 'Đã chuyển role thành công.',
        'role.roleChangedWarning': 'Đã lưu tạm role.',
        'membership.dashboardTitle': 'Gói Thành viên Của Bạn',
        'membership.dashboardSubtitle': 'Quản lý gói thành viên và nâng cấp tài khoản',
        'membership.benefitsTitle': 'Lợi ích:',
        'membership.currentPlanBadge': 'GÓI HIỆN TẠI',
        'membership.currentStatus': 'Trạng thái:',
        'membership.startDate': 'Ngày bắt đầu:',
        'membership.endDate': 'Ngày hết hạn:',
        'membership.feeDiscount': 'Lệ phí giao dịch:',
        'membership.membershipsTitle': 'Các Gói Thành viên',
        'membership.statsTitle': 'Thống kê Tài khoản',
        'membership.listingsLabel': 'Tin đăng',
        'membership.salesLabel': 'Tổng doanh số',
        'membership.revenueLabel': 'Tổng thu nhập',
        'membership.ratingLabel': 'Đánh giá',
        'membership.free': 'Miễn phí',
        'membership.perMonth': '/tháng',
        'membership.activeStatus': '✓ Hoạt động',
        'membership.inactiveStatus': '✗ Không hoạt động',
        'membership.noExpiry': 'Không có thời hạn',
        'membership.featureColumn': 'Tính năng'
    },
    en: {
        'page.title': 'Cho Xin',
        'nav.home': 'Home',
        'nav.cart': 'Cart',
        'nav.orders': 'Orders',
        'nav.profile': 'Profile',
        'nav.role': 'Role',
        'nav.language': 'Language',
        'auth.login': '🔐 Login',
        'auth.signup': '📝 Sign up',
        'home.title': 'Welcome to Cho Xin',
        'home.desc': 'Choose one of the two ways to continue on the website:',
        'home.goWebsite': 'Go to website',
        'home.stay': 'Stay and view info',
        'info.title': 'Info before entering main page',
        'info.desc': 'This is where you can preview introduction, product images and choose before logging in.',
        'info.card1.title': 'Online marketplace',
        'info.card1.desc': 'Discover new products with dark UI and unique effects.',
        'info.card2.title': 'Quick login',
        'info.card2.desc': 'Sign in with email and password to manage your cart right away.',
        'info.card3.title': 'User info',
        'info.card3.desc': 'You are not logged in. Please log in or sign up to see personal information.',
        'category.all': '📦 All',
        'category.electronics': '📱 Electronics',
        'category.fashion': '👗 Fashion',
        'category.food': '🍔 Food',
        'category.home': '🛋️ Home',
        'category.vehicles': '🚗 Vehicles',
        'category.appliances': '🏠 Appliances',
        'category.timeLabel': '⏰ Time:',
        'time.all': 'All time',
        'time.today': 'Today',
        'time.yesterday': 'Yesterday',
        'time.week': 'Last week',
        'time.month': 'Last month',
        'sort.popular': 'Most popular',
        'sort.priceLow': 'Price low',
        'sort.priceHigh': 'Price high',
        'sort.rating': 'Top rated',
        'search.placeholder': 'Search products...',
        'banner.title': '🛍️ Online Marketplace',
        'banner.desc': 'Shop easily - Fast delivery',
        'banner.sell': '📣 Sell now',
        'empty.title': 'No products found',
        'empty.desc': 'Try searching for different keywords',
        'about.title': 'About Cho Xin',
        'about.desc': 'Cho Xin is a friendly and fast online marketplace for Vietnamese users.',
        'about.expand': 'Expand',
        'about.content1': 'Cho Xin offers a secure and easy shopping experience with a wide range of products from electronics, fashion, home goods to everyday essentials.',
        'about.content2': 'We focus on a lightweight interface, fast search and instant ordering to save you time in every transaction.',
        'about.content3': 'With Cho Xin, you can log in, browse products, manage orders and checkout easily in one platform.',
        'cart.title': '🛒 Shopping Cart',
        'cart.summaryTitle': 'Order Summary',
        'cart.subtotalLabel': 'Subtotal:',
        'cart.shippingLabel': 'Shipping fee:',
        'cart.orderFeeLabel': 'Order fee:',
        'cart.discountLabel': 'Discount:',
        'cart.totalLabel': 'Total:',
        'cart.checkout': 'Checkout',
        'orders.title': '📦 My Orders',
        'orders.desc': 'You can also open the separate orders page: View order.html',
        'orders.empty': 'You have no orders yet.',
        'pay.title': 'Checkout',
        'pay.desc': 'Choose the right payment method and complete the transaction quickly.',
        'pay.option1Title': '1. Supported payment apps',
        'pay.option1Desc': 'Scan a QR code with VNPAY, ZaloPay, Momo or your bank.',
        'pay.qrNote': 'Scan the QR code to pay instantly.',
        'pay.option2Title': '2. E-wallet',
        'pay.option2Desc': 'Choose VNPAY or other connected wallets.',
        'pay.bankTitle': 'Banks and cards',
        'pay.bankNote': 'Choose the right bank to transfer or pay by card.',
        'pay.notesTitle': '3. Notes',
        'pay.note1': 'Payment limits depend on the bank/wallet.',
        'pay.note2': 'Successful payment updates your order immediately.',
        'pay.note3': 'Contact support if you encounter payment issues.',
        'pay.backToHome': 'Back to home',
        'product.back': '← Back',
        'product.brand': 'Cho Xin',
        'product.subtitle': 'Product detail page',
        'product.detail': 'Detailed description',
        'product.specs': 'Product specifications',
        'product.contactInfo': 'Contact information',
        'product.posted': 'Posted:',
        'product.location': 'Location',
        'product.relatedTitle': 'Related products',
        'product.relatedLoading': 'Loading suggestions...',
        'product.noSuggestions': 'No suggestions available.',
        'product.errorNotFound': 'Product not found. Please go back to the previous page.',
        'product.errorLoading': 'Product load error:',
        'profile.title': '👤 User Profile',
        'profile.balanceMini': 'Wallet balance',
        'profile.statusMini': 'Status',
        'profile.phoneMini': 'Phone number',
        'profile.nationalityMini': 'Nationality',
        'profile.userId': 'User ID',
        'profile.email': 'Email',
        'profile.phoneDisplay': 'Phone number',
        'profile.phoneStatus': 'Phone status',
        'profile.nationality': 'Nationality',
        'profile.roleType': 'Current plan',
        'profile.address': 'Address',
        'profile.verifyPhone': 'Verify phone number',
        'profile.changePhone': 'Change / Add number',
        'profile.addPhone': 'Add phone number',
        'profile.phoneHint': 'No phone number yet? Tap “Change / Add number” to enter and verify by SMS.',
        'profile.editorTitle': 'Change phone number',
        'profile.nationalityLabel': 'Nationality',
        'profile.phoneInputLabel': 'Phone number',
        'profile.phonePlaceholder': 'Enter phone number...',
        'profile.phoneNote': 'For Vietnam: if starting with 0 use 10 digits; without 0 use 9 digits. 10 digits without 0 is invalid.',
        'profile.savePhone': 'Save number',
        'profile.cancel': 'Cancel',
        'profile.verifyTitle': 'Verify phone number',
        'profile.verifyInfo': 'Tap “Verify phone number” to receive an SMS code.',
        'profile.verificationCodeLabel': 'Verification code',
        'profile.confirmVerify': 'Confirm code',
        'profile.resendCode': 'Resend code',
        'profile.loginPromptTitle': '🔐 Please log in',
        'profile.loginPromptDesc': 'To view your profile and manage personal information',
        'profile.loginButton': 'Log in',
        'profile.signupPrompt': 'No account yet? Sign up now',
        'profile.signupLink': 'Sign up now',
        'profile.phoneSaved': 'New phone number saved. Please verify it.',
        'profile.addPhoneFirst': 'Please add a phone number before verification.',
        'profile.verificationSent': 'Verification SMS has been sent. The test code is shown in the UI.',
        'profile.verificationInstruction': 'A verification code has been sent to {phone}. Test code: {code}',
        'profile.sendBeforeVerify': 'Please send the verification code first.',
        'profile.verificationSuccess': 'Phone number verified successfully.',
        'profile.verificationFailed': 'Verification code is incorrect.',
        'role.title': '⭐ Role / Membership Management',
        'role.loginRequiredDesc': 'Log in to buy a role and manage your membership plan.',
        'role.loginButton': 'Log in',
        'role.signupPrompt': 'No account yet? Sign up now',
        'role.buyRoleError': 'You must be logged in before buying a role.',
        'role.rolePurchasedSuccess': 'Role purchase successful!',
        'role.rolePurchasedWarning': 'Role changes saved locally even if Firebase connection may not be confirmed.',
        'role.roleChangeError': 'You must be logged in before changing roles.',
        'role.roleChangedSuccess': 'Role changed successfully.',
        'role.roleChangedWarning': 'Role change saved locally.',
        'membership.dashboardTitle': 'Your Membership Plan',
        'membership.dashboardSubtitle': 'Manage membership and upgrade your account',
        'membership.benefitsTitle': 'Benefits:',
        'membership.currentPlanBadge': 'CURRENT PLAN',
        'membership.currentStatus': 'Status:',
        'membership.startDate': 'Start date:',
        'membership.endDate': 'End date:',
        'membership.feeDiscount': 'Transaction fee:',
        'membership.membershipsTitle': 'Membership Plans',
        'membership.statsTitle': 'Account Statistics',
        'membership.listingsLabel': 'Listings',
        'membership.salesLabel': 'Total sales',
        'membership.revenueLabel': 'Total revenue',
        'membership.ratingLabel': 'Rating',
        'membership.free': 'Free',
        'membership.perMonth': '/month',
        'membership.activeStatus': '✓ Active',
        'membership.inactiveStatus': '✗ Inactive',
        'membership.noExpiry': 'No expiry',
        'membership.featureColumn': 'Feature'
    }
};

function getCurrentLanguage() {
    return localStorage.getItem(languageStorageKey) || 'vi';
}

function translate(key, defaultText) {
    const lang = getCurrentLanguage();
    const value = translations[lang] && translations[lang][key];
    return value !== undefined ? value : defaultText || key;
}

function setElementText(el, text) {
    if (!el) return;
    const icon = el.querySelector(':scope > .nav-icon');
    if (icon) {
        const iconHtml = icon.outerHTML;
        el.innerHTML = `${iconHtml} ${text}`;
        return;
    }
    el.textContent = text;
}

function updateLanguageToggleLabel(langCode) {
    const toggle = document.getElementById('languageToggle');
    if (!toggle) return;
    const icon = toggle.querySelector(':scope > .nav-icon');
    const label = languageNames[langCode] || langCode;
    if (icon) {
        toggle.innerHTML = `${icon.outerHTML} ${label}`;
        return;
    }
    toggle.textContent = label;
}

function updateTranslations(langCode) {
    document.documentElement.lang = langCode;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!key) return;
        const value = translate(key, el.textContent.trim());
        setElementText(el, value);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (!key) return;
        el.setAttribute('placeholder', translate(key, el.getAttribute('placeholder') || ''));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        if (!key) return;
        const value = translate(key, el.textContent.trim());
        if (el.tagName === 'TITLE') {
            document.title = value;
        } else {
            setElementText(el, value);
        }
    });

    updateLanguageToggleLabel(langCode);
}

function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (!menu) return;
    menu.classList.toggle('hidden');
}

function closeLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (!menu) return;
    menu.classList.add('hidden');
}

function setLanguage(langCode) {
    localStorage.setItem(languageStorageKey, langCode);
    updateTranslations(langCode);
    closeLanguageMenu();
}

function initI18n() {
    const toggle = document.getElementById('languageToggle');
    const options = Array.from(document.querySelectorAll('.language-option'));

    if (toggle) {
        toggle.addEventListener('click', event => {
            event.stopPropagation();
            toggleLanguageMenu();
        });
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            setLanguage(option.dataset.lang);
        });
    });

    document.addEventListener('click', event => {
        const menu = document.getElementById('languageMenu');
        const switcher = document.querySelector('.language-switcher');
        if (!menu || !switcher) return;
        if (!switcher.contains(event.target)) {
            closeLanguageMenu();
        }
    });

    setLanguage(getCurrentLanguage());
}

window.i18n = {
    init: initI18n,
    translate,
    setLanguage,
    getCurrentLanguage,
    languageNames
};
window.t = translate;

document.addEventListener('DOMContentLoaded', initI18n);
