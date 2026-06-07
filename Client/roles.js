/**
 * User Roles and Membership Tiers System
 */

// Define membership tiers
export const MEMBERSHIP_TIERS = {
    FREE: {
        id: 'free',
        name: 'Free Member',
        displayName: 'Thành viên Miễn phí',
        icon: '👤',
        description: 'Các tính năng cơ bản dành cho người mới',
        monthlyFee: 0,
        benefits: [
            'Xem sản phẩm',
            'Tạo tin cơ bản (3 tin/tháng)',
            'Tìm kiếm cơ bản',
            'Thông báo qua email',
            'Hỗ trợ tiêu chuẩn',
            'Điểm đánh giá người bán cơ bản'
        ]
    },
    STARTER: {
        id: 'starter',
        name: 'Starter Member',
        displayName: 'Thành viên Starter',
        icon: '✨',
        description: 'Nâng cấp nhẹ cho người dùng muốn bán nhiều hơn',
        monthlyFee: 19000,
        benefits: [
            'Tạo tới 10 tin/tháng',
            'Tin nổi bật cơ bản',
            'Hỗ trợ ưu tiên nhanh',
            'Báo cáo đơn giản',
            'Giao diện người bán tốt hơn',
            'Lọc sản phẩm nâng cao',
            'Thông báo đẩy qua email',
            'Giảm 2% phí giao dịch'
        ]
    },
    PLUS: {
        id: 'plus',
        name: 'Plus Member',
        displayName: 'Thành viên Plus',
        icon: '⭐',
        description: 'Tính năng nâng cao cho người bán hoạt động',
        monthlyFee: 49000,
        benefits: [
            'Tạo tin không giới hạn',
            'Tin nổi bật (5 vị trí cao cấp/tháng)',
            'Hỗ trợ khách hàng ưu tiên',
            'Phân tích và báo cáo nâng cao',
            'Tăng hiển thị 2x',
            'Tùy chỉnh cửa hàng',
            'Huy hiệu người bán',
            'Gợi ý sản phẩm thông minh',
            'Mẫu tin bán hàng đẹp',
            'Giảm 5% phí giao dịch'
        ]
    },
    PREMIUM: {
        id: 'premium',
        name: 'Premium Member',
        displayName: 'Thành viên Premium',
        icon: '👑',
        description: 'Tối đa hóa sự hiện diện cho người bán chuyên nghiệp',
        monthlyFee: 149000,
        benefits: [
            'Tất cả tính năng Plus',
            'Tin nổi bật không giới hạn',
            'Hỗ trợ VIP 24/7',
            'Công cụ marketing nâng cao',
            'Tăng hiển thị 5x',
            'Tuỳ chọn tên miền tùy chỉnh',
            'Huy hiệu cao cấp',
            'Quảng cáo ưu tiên',
            'Đồng bộ mạng xã hội',
            'Giảm 10% phí giao dịch',
            'Quản lý tài khoản chuyên nghiệp',
            'Hiển thị trên mục "Top Sellers"',
            'Thông báo Email & SMS',
            'Quản lý kho hàng nâng cao'
        ]
    },
    BUSINESS: {
        id: 'business',
        name: 'Business Member',
        displayName: 'Thành viên Kinh doanh',
        icon: '🏢',
        description: 'Giải pháp toàn diện cho doanh nghiệp',
        monthlyFee: 499000,
        benefits: [
            'Tất cả tính năng Premium',
            'Nhiều tài khoản người bán',
            'Truy cập API',
            'Tùy chỉnh tích hợp',
            'Tùy chọn thương hiệu riêng',
            'Công cụ đăng tin hàng loạt',
            'Báo cáo & phân tích nâng cao',
            'Hỗ trợ hợp đồng B2B',
            'Tích hợp đối tác vận chuyển',
            'Giảm 20% phí giao dịch',
            'Hỗ trợ kỹ thuật chuyên dụng',
            'Tư vấn kinh doanh hàng tháng',
            'Bảo mật doanh nghiệp',
            'Điều khoản thanh toán linh hoạt'
        ]
    },
    ENTERPRISE: {
        id: 'enterprise',
        name: 'Enterprise Member',
        displayName: 'Thành viên Doanh nghiệp',
        icon: '🚀',
        description: 'Gói cao cấp cho doanh nghiệp lớn và đối tác chiến lược',
        monthlyFee: 899000,
        benefits: [
            'Tất cả tính năng Business',
            'Quản lý thương hiệu toàn diện',
            'Hỗ trợ triển khai cá nhân',
            'Thống kê dữ liệu nâng cao',
            'Tích hợp API chuyên sâu',
            'Tùy chỉnh hợp đồng và thanh toán',
            'Báo cáo KPI chuyên biệt',
            'Đào tạo và tư vấn riêng',
            'Hỗ trợ 24/7 dạng VIP',
            'Quản lý nhiều chi nhánh',
            'Quyền truy cập sớm tính năng mới',
            'Hỗ trợ tuỳ biến giao diện',
            'Bảo mật và tuân thủ nâng cao'
        ]
    }
};

// Get tier by id
export function getTierById(tierId) {
    for (const [key, tier] of Object.entries(MEMBERSHIP_TIERS)) {
        if (tier.id === tierId) {
            return tier;
        }
    }
    return MEMBERSHIP_TIERS.FREE;
}

// Get all tiers as array
export function getAllTiers() {
    return Object.values(MEMBERSHIP_TIERS);
}

// Check if user has specific benefit
export function hasBenefit(userRole, benefitName) {
    const tier = getTierById(userRole);
    return tier.benefits.includes(benefitName);
}

// Get user role display info
export function getRoleDisplay(userRole) {
    const tier = getTierById(userRole);
    return {
        icon: tier.icon,
        displayName: tier.displayName,
        monthlyFee: tier.monthlyFee,
        color: getRoleColor(userRole)
    };
}

// Get role color for UI display
export function getRoleColor(userRole) {
    switch (userRole) {
        case 'free':
            return '#808080'; // Gray
        case 'starter':
            return '#8BC34A'; // Green
        case 'plus':
            return '#FFB800'; // Gold
        case 'premium':
            return '#E91E63'; // Pink/Magenta
        case 'business':
            return '#2196F3'; // Blue
        case 'enterprise':
            return '#673AB7'; // Deep Purple
        default:
            return '#808080';
    }
}

// Check if user can perform action based on role
export function canPerformAction(userRole, action) {
    const tier = getTierById(userRole);
    
    const actionLimits = {
        'create_listing': {
            free: 3,
            plus: Infinity,
            premium: Infinity,
            business: Infinity
        },
        'boost_visibility': {
            free: 0,
            plus: 2,
            premium: 5,
            business: Infinity
        },
        'featured_spots': {
            free: 0,
            plus: 5,
            premium: Infinity,
            business: Infinity
        }
    };
    
    return actionLimits[action] ? actionLimits[action][userRole] > 0 : true;
}

// Get action limit for user role
export function getActionLimit(userRole, action) {
    const limits = {
        'create_listing': {
            free: 3,
            starter: 10,
            plus: Infinity,
            premium: Infinity,
            business: Infinity,
            enterprise: Infinity
        },
        'boost_visibility': {
            free: 0,
            starter: 1,
            plus: 2,
            premium: 5,
            business: Infinity,
            enterprise: Infinity
        },
        'featured_spots': {
            free: 0,
            starter: 1,
            plus: 5,
            premium: Infinity,
            business: Infinity,
            enterprise: Infinity
        }
    };
    
    return limits[action] ? limits[action][userRole] : 0;
}

// Get transaction fee discount
export function getTransactionFeeDiscount(userRole) {
    const discounts = {
        free: 0,
        starter: 0.02,
        plus: 0.05,
        premium: 0.10,
        business: 0.20,
        enterprise: 0.25
    };
    return discounts[userRole] || 0;
}

// Format price with role discount applied
export function calculatePriceWithDiscount(price, userRole) {
    const discount = getTransactionFeeDiscount(userRole);
    return Math.floor(price * (1 - discount));
}

// Check if user can access feature
export function canAccessFeature(userRole, feature) {
    const featureAccess = {
        'analytics': ['starter', 'plus', 'premium', 'business', 'enterprise'],
        'storefront_customization': ['starter', 'plus', 'premium', 'business', 'enterprise'],
        'bulk_tools': ['business', 'enterprise'],
        'api_access': ['business', 'enterprise'],
        'multiple_accounts': ['business', 'enterprise'],
        'priority_support': ['starter', 'plus', 'premium', 'business', 'enterprise'],
        'vip_support': ['premium', 'business', 'enterprise']
    };
    
    return featureAccess[feature] ? featureAccess[feature].includes(userRole) : true;
}

// Get upgrade recommendation
export function getUpgradeRecommendation(userStats) {
    const { listings, monthlyRevenue, supportTickets, listingsCreatedThisMonth } = userStats;
    
    if (monthlyRevenue > 100000000) return 'enterprise';
    if (monthlyRevenue > 50000000) return 'business';
    if (monthlyRevenue > 10000000 || listingsCreatedThisMonth > 8) return 'premium';
    if (listingsCreatedThisMonth > 4 || monthlyRevenue > 2000000) return 'plus';
    if (listingsCreatedThisMonth > 1) return 'starter';
    return 'free';
}
