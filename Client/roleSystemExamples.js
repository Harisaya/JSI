/**
 * QUICK START EXAMPLES
 * Copy and adapt these examples to use the role system in your app
 */

// ============================================================================
// EXAMPLE 1: Display User Role in Profile
// ============================================================================
import { getRoleDisplay } from './roles.js';
import { getUserRole } from './roleManagement.js';

async function displayUserProfile(userId, userData) {
    const roleDisplay = getRoleDisplay(userData.role || 'free');
    
    const profileHTML = `
        <div class="user-profile">
            <h2>${userData.name}</h2>
            <p class="email">${userData.email}</p>
            
            <!-- Role Badge -->
            <div class="role-badge" style="background-color: ${roleDisplay.color}">
                <span class="role-icon">${roleDisplay.icon}</span>
                <span class="role-name">${roleDisplay.displayName}</span>
            </div>
            
            <p class="role-price">
                ${roleDisplay.monthlyFee === 0 ? 'Miễn phí' : roleDisplay.monthlyFee.toLocaleString('vi-VN') + '₫/tháng'}
            </p>
        </div>
    `;
    
    return profileHTML;
}

// ============================================================================
// EXAMPLE 2: Check if User Can Create a Listing
// ============================================================================
import { getUserActionLimit, incrementUserStat } from './roleManagement.js';

async function canCreateListing(userId, userData) {
    const limit = await getUserActionLimit(userId, 'monthly_listings');
    const currentCount = userData.stats?.listingsActive || 0;
    
    if (currentCount >= limit && limit !== Infinity) {
        return {
            canCreate: false,
            message: `You've reached your limit of ${limit} listings. Upgrade to create more!`,
            currentTier: userData.role,
            requiredTier: limit < 50 ? 'plus' : limit < 200 ? 'premium' : 'business'
        };
    }
    
    return { canCreate: true };
}

// When user successfully creates a listing:
async function onListingCreated(userId) {
    await incrementUserStat(userId, 'listingsCreated', 1);
    await incrementUserStat(userId, 'listingsActive', 1);
}

// ============================================================================
// EXAMPLE 3: Apply Transaction Fee Discount
// ============================================================================
import { getTransactionFeeDiscount } from './roles.js';

async function calculateTransactionFee(userId, userData, transactionAmount) {
    const baseFeeTier = 0.03; // 3% base fee
    const discount = getTransactionFeeDiscount(userData.role);
    
    const finalFeePercentage = baseFeeTier * (1 - discount);
    const fee = transactionAmount * finalFeePercentage;
    
    const receipt = {
        amount: transactionAmount,
        basePercentage: (baseFeeTier * 100).toFixed(1),
        discountPercentage: (discount * 100).toFixed(0),
        finalFeePercentage: (finalFeePercentage * 100).toFixed(2),
        feeAmount: Math.floor(fee),
        userReceives: Math.floor(transactionAmount - fee)
    };
    
    return receipt;
}

// Usage:
// const receipt = await calculateTransactionFee(userId, userData, 1000000);
// console.log(`Fee: ${receipt.feeAmount}₫ (${receipt.finalFeePercentage}%)`);

// ============================================================================
// EXAMPLE 4: Show "Feature Locked" Message
// ============================================================================
import { hasFeatureAccess, getTierById } from './roleManagement.js';

async function showFeatureUpgradePrompt(userId, userData, featureName) {
    const hasAccess = await hasFeatureAccess(userId, featureName);
    
    if (!hasAccess) {
        const featureRequirements = {
            'analytics': 'plus',
            'bulk_upload': 'premium',
            'api_access': 'business'
        };
        
        const requiredRole = featureRequirements[featureName];
        const tier = getTierById(requiredRole);
        
        const upgradePrompt = `
            <div class="upgrade-prompt">
                <h3>🔒 ${featureName.replace(/_/g, ' ')} - Upgrade Required</h3>
                <p>This feature is only available for ${tier.displayName} and above.</p>
                <p>Upgrade to unlock advanced features:</p>
                <ul>
                    ${tier.benefits.slice(0, 3).map(b => `<li>✓ ${b}</li>`).join('')}
                </ul>
                <button onclick="location.href='#membership'">Upgrade for ${tier.monthlyFee.toLocaleString('vi-VN')}₫</button>
            </div>
        `;
        
        return upgradePrompt;
    }
    
    return null; // User has access
}

// ============================================================================
// EXAMPLE 5: Display Featured Listings Remaining
// ============================================================================
import { getActionLimit } from './roles.js';

function showFeaturedListingsRemaining(userData) {
    const limit = getActionLimit(userData.role, 'featured_spots');
    const used = userData.stats?.featuredListingsUsedThisMonth || 0;
    const remaining = limit === Infinity ? 'Unlimited' : (limit - used);
    
    const display = `
        <div class="featured-stats">
            <h4>Featured Listings This Month</h4>
            <div class="progress-bar">
                <div class="progress" style="width: ${(used / limit * 100) || 0}%"></div>
            </div>
            <p>${used} / ${limit === Infinity ? '∞' : limit} used</p>
            <p class="remaining">${remaining} remaining</p>
        </div>
    `;
    
    return display;
}

// ============================================================================
// EXAMPLE 6: Show Upgrade Recommendation
// ============================================================================
import { getUpgradeRecommendation, getTierById } from './roles.js';

function showUpgradeRecommendation(userData) {
    const stats = userData.stats;
    const recommendedRole = getUpgradeRecommendation(stats);
    const recommendedTier = getTierById(recommendedRole);
    
    if (recommendedRole === userData.role) {
        return null; // Already on recommended tier
    }
    
    const recommendation = `
        <div class="upgrade-recommendation">
            <h3>📈 Recommended for You</h3>
            <p>Based on your activity, we recommend upgrading to ${recommendedTier.displayName}:</p>
            <div class="reason">
                <p>Your monthly revenue: ${(stats.totalRevenue).toLocaleString('vi-VN')}₫</p>
                <p>Listings created: ${stats.listingsCreated}</p>
            </div>
            <p class="benefit">With ${recommendedTier.displayName}, you'll save 
                ${(getTierById(userData.role).icon)} in transaction fees and get additional features!</p>
            <button onclick="upgradeTierFlow('${recommendedRole}')">
                Upgrade to ${recommendedTier.displayName}
            </button>
        </div>
    `;
    
    return recommendation;
}

// ============================================================================
// EXAMPLE 7: Membership Expiration Warning
// ============================================================================
import { isMembershipExpired } from './roleManagement.js';

async function checkMembershipStatus(userId, userData) {
    if (userData.role === 'free') return null; // Free tier doesn't expire
    
    const isExpired = await isMembershipExpired(userId);
    
    if (isExpired) {
        return {
            status: 'expired',
            message: '⚠️ Your membership has expired. Some features are now limited.',
            action: 'Renew Now'
        };
    }
    
    // Check if expiring soon (within 7 days)
    if (userData.membershipEndDate) {
        const daysUntilExpiry = Math.ceil(
            (userData.membershipEndDate - new Date()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysUntilExpiry < 7 && daysUntilExpiry > 0) {
            return {
                status: 'expiring-soon',
                daysRemaining: daysUntilExpiry,
                message: `⏰ Your membership expires in ${daysUntilExpiry} days`,
                action: 'Renew Now'
            };
        }
    }
    
    return { status: 'active' };
}

// ============================================================================
// EXAMPLE 8: Admin - View Users by Role
// ============================================================================
import { getUsersByRole } from './roleManagement.js';

async function showUsersByRole(roleFilter) {
    const users = await getUsersByRole(roleFilter);
    
    const table = `
        <table class="admin-users-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Member Since</th>
                    <th>Total Revenue</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><span class="role-badge">${user.role}</span></td>
                        <td>${new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td>${(user.stats?.totalRevenue || 0).toLocaleString('vi-VN')}₫</td>
                        <td>
                            <button onclick="editUserRole('${user.id}')">Edit</button>
                            <button onclick="viewHistory('${user.id}')">History</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    return table;
}

// ============================================================================
// EXAMPLE 9: Role Badge Component (Reusable)
// ============================================================================
import { getRoleColor } from './roles.js';

function createRoleBadge(role) {
    const roleEmojis = {
        'free': '👤',
        'plus': '⭐',
        'premium': '👑',
        'business': '🏢'
    };
    
    const roleNames = {
        'free': 'Free',
        'plus': 'Plus',
        'premium': 'Premium',
        'business': 'Business'
    };
    
    return `
        <span class="role-badge" style="
            background-color: ${getRoleColor(role)};
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        ">
            ${roleEmojis[role]} ${roleNames[role]}
        </span>
    `;
}

// Usage: document.getElementById('badge-container').innerHTML = createRoleBadge('plus');

// ============================================================================
// EXAMPLE 10: Complete Flow - Upload Listing with Role Check
// ============================================================================
async function uploadListingWithRoleCheck(userId, userData, listingData) {
    // Step 1: Check if user can create listing
    const canCreate = await canCreateListing(userId, userData);
    if (!canCreate.canCreate) {
        showNotification(canCreate.message, 'warning');
        showUpgradePrompt(canCreate.requiredTier);
        return false;
    }
    
    // Step 2: Check featured listing limit if requested
    if (listingData.isFeatured) {
        const hasAccess = await hasFeatureAccess(userId, 'featured_listings');
        if (!hasAccess) {
            showNotification('Featured listings available for Plus members', 'warning');
            return false;
        }
    }
    
    // Step 3: Upload listing to Firestore
    try {
        const listingRef = await addDoc(collection(db, 'listings'), {
            ...listingData,
            userId: userId,
            createdAt: serverTimestamp(),
            viewCount: 0,
            isFeatured: listingData.isFeatured || false
        });
        
        // Step 4: Update user stats
        await onListingCreated(userId);
        
        // Step 5: Show success and ask about featured
        showNotification('Listing created successfully!', 'success');
        
        if (!listingData.isFeatured && userData.role !== 'free') {
            setTimeout(() => {
                showPrompt('Make this listing featured? (More visibility)', () => {
                    featureListing(listingRef.id, userId);
                });
            }, 1000);
        }
        
        return true;
    } catch (error) {
        console.error('Error creating listing:', error);
        showNotification('Failed to create listing', 'error');
        return false;
    }
}

// ============================================================================
// EXAMPLE 11: Database Statistics Query
// ============================================================================
async function getDashboardStats() {
    const roleStats = {
        free: 0,
        plus: 0,
        premium: 0,
        business: 0
    };
    
    const stats = {
        totalUsers: 0,
        roleDistribution: roleStats,
        totalRevenue: 0,
        totalListings: 0,
        averageRating: 0
    };
    
    try {
        // Query all users
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        
        stats.totalUsers = querySnapshot.size;
        
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            stats.roleDistribution[user.role]++;
            stats.totalRevenue += user.stats?.totalRevenue || 0;
            stats.totalListings += user.stats?.listingsCreated || 0;
            stats.averageRating += user.stats?.rating || 0;
        });
        
        stats.averageRating = stats.averageRating / querySnapshot.size;
        
        return stats;
    } catch (error) {
        console.error('Error fetching stats:', error);
        return null;
    }
}

// ============================================================================
// USAGE IN YOUR HTML
// ============================================================================
/*
<div id="app">
    <!-- User Profile Section -->
    <div id="profile-section"></div>
    
    <!-- Feature Access Section -->
    <div id="feature-prompt"></div>
    
    <!-- Membership Status -->
    <div id="membership-status"></div>
    
    <!-- Upgrade Recommendation -->
    <div id="upgrade-recommendation"></div>
    
    <!-- Membership Dashboard -->
    <div id="membership-dashboard"></div>
</div>

<script type="module">
import { displayUserProfile } from './examples.js';
import { checkMembershipStatus } from './examples.js';
import { showUpgradeRecommendation } from './examples.js';
import { getUserRole } from './roleManagement.js';

// On page load
const user = firebase.auth().currentUser;
const userDoc = await getDoc(doc(db, 'users', user.uid));
const userData = userDoc.data();

// Display profile
document.getElementById('profile-section').innerHTML = await displayUserProfile(user.uid, userData);

// Check membership
const membershipStatus = await checkMembershipStatus(user.uid, userData);
if (membershipStatus && membershipStatus.status !== 'active') {
    document.getElementById('membership-status').innerHTML = `
        <div class="warning-banner">${membershipStatus.message}</div>
    `;
}

// Show recommendation
document.getElementById('upgrade-recommendation').innerHTML = showUpgradeRecommendation(userData);
</script>
*/
