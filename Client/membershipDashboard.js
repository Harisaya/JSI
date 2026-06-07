/**
 * Membership Dashboard UI
 * Displays user's current role, benefits, and upgrade options
 */

import { getAllTiers, getTierById, getRoleColor } from './roles.js';
import { getUserRole, upgradeUserRole, getUserActionLimit } from './roleManagement.js';

/**
 * Create membership card HTML
 * @param {Object} tier - Membership tier object
 * @param {boolean} isCurrentTier - Is this the user's current tier
 * @param {string} currentRole - User's current role
 * @returns {string} - HTML string
 */
export function createMembershipCard(tier, isCurrentTier = false, currentRole = 'free') {
    const ROLE_ORDER = ['free', 'starter', 'plus', 'premium', 'business', 'enterprise'];
    const isHigherTier = ROLE_ORDER.indexOf(tier.id) > ROLE_ORDER.indexOf(currentRole);
    
    return `
        <div class="membership-card ${isCurrentTier ? 'current-tier' : ''}" style="border-color: ${getRoleColor(tier.id)}">
            <div class="tier-header" style="background-color: ${getRoleColor(tier.id)}20; border-bottom: 2px solid ${getRoleColor(tier.id)}">
                <div class="tier-icon">${tier.icon}</div>
                <h3>${tier.displayName}</h3>
                <p class="tier-description">${tier.description}</p>
            </div>
            
            <div class="tier-pricing">
                ${tier.monthlyFee === 0 ? 
                    '<p class="price">Miễn phí</p>' : 
                    `<p class="price">${tier.monthlyFee.toLocaleString('vi-VN')} ₫<span class="period">/tháng</span></p>`
                }
            </div>
            
            <div class="tier-benefits">
                <h4>Lợi ích:</h4>
                <ul>
                    ${tier.benefits.map(benefit => `<li>✓ ${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <div class="tier-action">
                ${isCurrentTier ? 
                    '<button class="btn btn-current-tier" disabled>Gói hiện tại</button>' :
                    (isHigherTier ? 
                        `<button class="btn btn-upgrade" data-tier="${tier.id}" onclick="upgradeToTier('${tier.id}')">Nâng cấp</button>` :
                        `<button class="btn btn-downgrade" data-tier="${tier.id}" onclick="downgradeTier('${tier.id}')">Giảm cấp</button>`
                    )
                }
            </div>
            
            ${isCurrentTier ? `<div class="current-tier-badge">GÓI HIỆN TẠI</div>` : ''}
        </div>
    `;
}

/**
 * Create membership dashboard HTML
 * @param {Object} userData - User data with role information
 * @returns {string} - HTML string
 */
export function createMembershipDashboard(userData) {
    const currentTier = getTierById(userData.role || 'free');
    const allTiers = getAllTiers();
    
    // Format dates
    const startDate = userData.membershipStartDate ? 
        new Date(userData.membershipStartDate.seconds * 1000).toLocaleDateString('vi-VN') : 
        'N/A';
    
    const endDate = userData.membershipEndDate ? 
        new Date(userData.membershipEndDate.seconds * 1000).toLocaleDateString('vi-VN') : 
        'Không có thời hạn';

    return `
        <div class="membership-dashboard">
            <div class="dashboard-header">
                <h2>Gói Thành viên Của Bạn</h2>
                <p class="subtitle">Quản lý gói thành viên và nâng cấp tài khoản</p>
            </div>
            
            <div class="current-tier-info">
                <div class="info-card">
                    <div class="info-header" style="color: ${getRoleColor(userData.role || 'free')}">
                        <span class="icon">${currentTier.icon}</span>
                        <h3>${currentTier.displayName}</h3>
                    </div>
                    
                    <div class="info-details">
                        <div class="detail-item">
                            <span class="label">Trạng thái:</span>
                            <span class="value">${userData.membershipStatus === 'active' ? '✓ Hoạt động' : '✗ Không hoạt động'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Ngày bắt đầu:</span>
                            <span class="value">${startDate}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Ngày hết hạn:</span>
                            <span class="value">${endDate}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Lệ phí giao dịch:</span>
                            <span class="value" style="color: #4CAF50;">Giảm ${(getUserFeeDiscount(userData.role || 'free') * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="membership-cards-container">
                <h3>Các Gói Thành viên</h3>
                <div class="cards-grid">
                    ${allTiers.map(tier => 
                        createMembershipCard(tier, tier.id === (userData.role || 'free'), userData.role || 'free')
                    ).join('')}
                </div>
            </div>
            
            <div class="stats-section">
                <h3>Thống kê Tài khoản</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Tin đăng</div>
                        <div class="stat-value">${userData.stats?.listingsActive || 0}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Tổng doanh số</div>
                        <div class="stat-value">${(userData.stats?.totalSales || 0).toLocaleString('vi-VN')}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Tổng thu nhập</div>
                        <div class="stat-value">${(userData.stats?.totalRevenue || 0).toLocaleString('vi-VN')}₫</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Đánh giá</div>
                        <div class="stat-value">${(userData.stats?.rating || 0).toFixed(1)} ⭐</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Helper function to get fee discount
 * @param {string} role - User role
 * @returns {number} - Discount percentage
 */
function getUserFeeDiscount(role) {
    const discounts = {
        'free': 0,
        'starter': 0.02,
        'plus': 0.05,
        'premium': 0.10,
        'business': 0.20,
        'enterprise': 0.25
    };
    return discounts[role] || 0;
}

/**
 * Create membership comparison table
 * @returns {string} - HTML string
 */
export function createMembershipComparisonTable() {
    const allTiers = getAllTiers();
    const features = [
        { name: 'Tin đăng / tháng', key: 'listings' },
        { name: 'Tin nổi bật', key: 'featured' },
        { name: 'Boost hiển thị', key: 'boost' },
        { name: 'Tùy chỉnh storefront', key: 'storefront' },
        { name: 'Hỗ trợ ưu tiên', key: 'priority_support' },
        { name: 'Phân tích nâng cao', key: 'analytics' },
        { name: 'Giảm phí giao dịch', key: 'fee_discount' },
        { name: 'Hỗ trợ VIP 24/7', key: 'vip_support' },
        { name: 'Truy cập API', key: 'api' },
        { name: 'Nhiều tài khoản', key: 'multiple_accounts' },
        { name: 'Thông báo Email', key: 'email_notifications' },
        { name: 'Báo cáo tuỳ chỉnh', key: 'custom_reports' },
        { name: 'Quản lý nhóm bán hàng', key: 'team_management' },
        { name: 'Đồng bộ đa kênh', key: 'multi_channel' }
    ];

    const featureComparison = {
        listings: { free: 3, starter: 10, plus: '50', premium: '200', business: 'Unlimited', enterprise: 'Unlimited' },
        featured: { free: 0, starter: 1, plus: 5, premium: '20', business: 'Unlimited', enterprise: 'Unlimited' },
        boost: { free: 0, starter: 1, plus: 2, premium: '10', business: 'Unlimited', enterprise: 'Unlimited' },
        storefront: { free: false, starter: true, plus: true, premium: true, business: true, enterprise: true },
        priority_support: { free: false, starter: true, plus: true, premium: true, business: true, enterprise: true },
        analytics: { free: false, starter: true, plus: true, premium: true, business: true, enterprise: true },
        fee_discount: { free: '0%', starter: '2%', plus: '5%', premium: '10%', business: '20%', enterprise: '25%' },
        vip_support: { free: false, starter: false, plus: false, premium: true, business: true, enterprise: true },
        api: { free: false, starter: false, plus: false, premium: false, business: true, enterprise: true },
        multiple_accounts: { free: false, starter: false, plus: false, premium: false, business: true, enterprise: true },
        email_notifications: { free: true, starter: true, plus: true, premium: true, business: true, enterprise: true },
        custom_reports: { free: false, starter: true, plus: true, premium: true, business: true, enterprise: true },
        team_management: { free: false, starter: false, plus: false, premium: true, business: true, enterprise: true },
        multi_channel: { free: false, starter: false, plus: false, premium: true, business: true, enterprise: true }
    };

    let tableHTML = `
        <div class="comparison-table-wrapper">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Tính năng</th>
                        ${allTiers.map(tier => `<th style="color: ${getRoleColor(tier.id)}">${tier.displayName}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
    `;

    features.forEach(feature => {
        tableHTML += `
                    <tr>
                        <td>${feature.name}</td>
        `;
        allTiers.forEach(tier => {
            const value = featureComparison[feature.key][tier.id];
            const isBoolean = typeof value === 'boolean';
            tableHTML += `
                        <td>${isBoolean ? (value ? '✓' : '✗') : value}</td>
            `;
        });
        tableHTML += `
                    </tr>
        `;
    });

    tableHTML += `
                </tbody>
            </table>
        </div>
    `;

    return tableHTML;
}

/**
 * Create CSS for membership dashboard
 * @returns {string} - CSS string
 */
export function getMembershipDashboardCSS() {
    return `
        <style>
            .membership-dashboard {
                padding: 20px;
                background: #f5f5f5;
                border-radius: 8px;
            }

            .dashboard-header {
                text-align: center;
                margin-bottom: 30px;
            }

            .dashboard-header h2 {
                font-size: 28px;
                margin: 0 0 10px 0;
                color: #333;
            }

            .subtitle {
                color: #666;
                font-size: 14px;
            }

            .current-tier-info {
                margin-bottom: 30px;
            }

            .info-card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .info-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 20px;
            }

            .info-header .icon {
                font-size: 32px;
            }

            .info-header h3 {
                margin: 0;
                font-size: 22px;
            }

            .info-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }

            .detail-item {
                padding: 10px;
                background: #f9f9f9;
                border-radius: 4px;
            }

            .detail-item .label {
                display: block;
                font-size: 12px;
                color: #666;
                margin-bottom: 5px;
            }

            .detail-item .value {
                display: block;
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .membership-cards-container {
                margin-bottom: 30px;
            }

            .membership-cards-container h3 {
                margin-bottom: 20px;
                color: #333;
            }

            .cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
            }

            .membership-card {
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                border-left: 4px solid #ddd;
                position: relative;
            }

            .membership-card:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                transform: translateY(-2px);
            }

            .membership-card.current-tier {
                border-left-width: 6px;
            }

            .current-tier-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background: #4CAF50;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
            }

            .tier-header {
                padding: 20px;
                text-align: center;
            }

            .tier-icon {
                font-size: 36px;
                margin-bottom: 10px;
            }

            .tier-header h3 {
                margin: 10px 0 5px 0;
                font-size: 20px;
            }

            .tier-description {
                margin: 0;
                font-size: 12px;
                color: #666;
            }

            .tier-pricing {
                padding: 15px 20px;
                text-align: center;
                background: #fafafa;
                border-bottom: 1px solid #eee;
            }

            .tier-pricing .price {
                margin: 0;
                font-size: 24px;
                font-weight: 700;
                color: #333;
            }

            .tier-pricing .period {
                font-size: 14px;
                color: #666;
                margin-left: 5px;
            }

            .tier-benefits {
                padding: 20px;
            }

            .tier-benefits h4 {
                margin: 0 0 15px 0;
                font-size: 14px;
                color: #333;
            }

            .tier-benefits ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .tier-benefits li {
                padding: 8px 0;
                font-size: 13px;
                color: #555;
                border-bottom: 1px solid #f0f0f0;
            }

            .tier-benefits li:last-child {
                border-bottom: none;
            }

            .tier-action {
                padding: 15px 20px;
                text-align: center;
                border-top: 1px solid #eee;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
            }

            .btn-upgrade {
                background: #2196F3;
                color: white;
            }

            .btn-upgrade:hover {
                background: #1976D2;
            }

            .btn-downgrade {
                background: #f44336;
                color: white;
            }

            .btn-downgrade:hover {
                background: #d32f2f;
            }

            .btn-current-tier {
                background: #4CAF50;
                color: white;
                cursor: default;
            }

            .stats-section {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .stats-section h3 {
                margin-top: 0;
                color: #333;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
            }

            .stat-card {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 4px;
                text-align: center;
                border-top: 3px solid #2196F3;
            }

            .stat-label {
                font-size: 12px;
                color: #666;
                margin-bottom: 10px;
            }

            .stat-value {
                font-size: 24px;
                font-weight: 700;
                color: #333;
            }

            .comparison-table-wrapper {
                overflow-x: auto;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .comparison-table {
                width: 100%;
                border-collapse: collapse;
            }

            .comparison-table th {
                background: #f5f5f5;
                padding: 15px;
                text-align: left;
                font-weight: 600;
                border-bottom: 2px solid #ddd;
            }

            .comparison-table td {
                padding: 15px;
                border-bottom: 1px solid #eee;
            }

            .comparison-table tbody tr:hover {
                background: #fafafa;
            }

            @media (max-width: 768px) {
                .cards-grid {
                    grid-template-columns: 1fr;
                }

                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .comparison-table-wrapper {
                    overflow-x: auto;
                }
            }
        </style>
    `;
}
