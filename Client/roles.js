/**
 * User Roles and Membership Tiers System
 */

// Define membership tiers
export const MEMBERSHIP_TIERS = {
    FREE: {
        id: 'free',
        name: 'Free Member',
        displayName: 'Thành viên miễn phí',
        icon: '👤',
        description: 'Basic features for new users',
        monthlyFee: 0,
        benefits: [
            'View products',
            'Create basic listings (3/month)',
            'Standard support',
            'Basic seller rating'
        ]
    },
    PLUS: {
        id: 'plus',
        name: 'Plus Member',
        displayName: 'Thành viên Plus',
        icon: '⭐',
        description: 'Enhanced features for active sellers',
        monthlyFee: 49000, // VND
        benefits: [
            'Create unlimited listings',
            'Featured listings (5 premium spots/month)',
            'Priority customer support',
            'Advanced analytics & reports',
            'Boost visibility (2x)',
            'Custom storefront branding',
            'Seller badge on profile',
            '5% transaction fee discount'
        ]
    },
    PREMIUM: {
        id: 'premium',
        name: 'Premium Member',
        displayName: 'Thành viên Premium',
        icon: '👑',
        description: 'Maximum exposure for professional sellers',
        monthlyFee: 149000, // VND
        benefits: [
            'All Plus features',
            'Unlimited featured listings',
            'VIP customer support (24/7)',
            'Advanced marketing tools',
            'Boost visibility (5x)',
            'Custom domain options',
            'Premium seller badge',
            '10% transaction fee discount',
            'Dedicated account manager',
            'Featured in "Top Sellers" section',
            'Email & SMS notifications',
            'Advanced inventory management'
        ]
    },
    BUSINESS: {
        id: 'business',
        name: 'Business Member',
        displayName: 'Thành viên Kinh doanh',
        icon: '🏢',
        description: 'Complete enterprise solution',
        monthlyFee: 499000, // VND
        benefits: [
            'All Premium features',
            'Multiple seller accounts',
            'API access',
            'Custom integrations',
            'White-label options',
            'Bulk listing tools',
            'Advanced reporting & analytics',
            '20% transaction fee discount',
            'Dedicated technical support',
            'Monthly business consultation',
            'Enterprise security features',
            'Custom payment terms'
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
        case 'plus':
            return '#FFB800'; // Gold
        case 'premium':
            return '#E91E63'; // Pink/Magenta
        case 'business':
            return '#2196F3'; // Blue
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
    
    return limits[action] ? limits[action][userRole] : 0;
}

// Get transaction fee discount
export function getTransactionFeeDiscount(userRole) {
    const discounts = {
        free: 0,
        plus: 0.05,      // 5%
        premium: 0.10,   // 10%
        business: 0.20   // 20%
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
        'analytics': ['plus', 'premium', 'business'],
        'storefront_customization': ['plus', 'premium', 'business'],
        'bulk_tools': ['business'],
        'api_access': ['business'],
        'multiple_accounts': ['business'],
        'priority_support': ['plus', 'premium', 'business'],
        'vip_support': ['premium', 'business']
    };
    
    return featureAccess[feature] ? featureAccess[feature].includes(userRole) : true;
}

// Get upgrade recommendation
export function getUpgradeRecommendation(userStats) {
    const { listings, monthlyRevenue, supportTickets, listingsCreatedThisMonth } = userStats;
    
    if (monthlyRevenue > 50000000) return 'business';
    if (monthlyRevenue > 10000000 || listingsCreatedThisMonth > 5) return 'premium';
    if (listingsCreatedThisMonth > 3 || monthlyRevenue > 2000000) return 'plus';
    return 'free';
}
