# User Role & Membership System Documentation

## Overview
A complete user role and membership tier system for your Firebase e-commerce platform. This system allows you to manage different user tiers (Free, Plus, Premium, Business) with different features, benefits, and pricing.

## Files Created

### 1. **roles.js**
Defines membership tiers and provides utility functions for role management.

**Key Exports:**
- `MEMBERSHIP_TIERS` - Object containing all tier definitions (FREE, PLUS, PREMIUM, BUSINESS)
- `getTierById(tierId)` - Get tier details by ID
- `getAllTiers()` - Get all tiers as array
- `getRoleColor(userRole)` - Get UI color for role
- `hasRenefit(userRole, benefitName)` - Check if user has specific benefit
- `getActionLimit(userRole, action)` - Get limits for user's role
- `getTransactionFeeDiscount(userRole)` - Get fee discount percentage
- `canAccessFeature(userRole, feature)` - Check feature access

**Example Usage:**
```javascript
import { getTierById, MEMBERSHIP_TIERS } from './roles.js';

const tier = getTierById('plus');
console.log(tier.displayName); // "Thành viên Plus"
console.log(tier.monthlyFee); // 49000
console.log(tier.benefits); // Array of benefits
```

### 2. **roleManagement.js**
Backend role management functions for Firestore operations.

**Key Functions:**
- `upgradeUserRole(userId, newRole)` - Upgrade user to new tier
- `downgradeUserRole(userId, newRole, reason)` - Downgrade user
- `getUserRole(userId)` - Get user's current role info
- `hasFeatureAccess(userId, featureName)` - Check feature access
- `getUserActionLimit(userId, actionType)` - Get user's action limits
- `getUserFeeDiscount(userId)` - Get transaction fee discount
- `updateUserStats(userId, statUpdates)` - Update user statistics
- `incrementUserStat(userId, stat, amount)` - Increment a stat
- `isMembershipExpired(userId)` - Check if membership expired
- `autoDowngradeIfExpired(userId)` - Auto-downgrade expired memberships
- `getUsersByRole(role)` - Get all users with specific role
- `getRoleChangeHistory(userId)` - Get role change history

**Example Usage:**
```javascript
import { upgradeUserRole, getUserRole, hasFeatureAccess } from './roleManagement.js';

// Upgrade user to Plus tier
await upgradeUserRole(userId, 'plus');

// Check if user can access analytics
const canAccess = await hasFeatureAccess(userId, 'analytics');

// Get user's listing limit this month
const limit = await getUserActionLimit(userId, 'monthly_listings');
```

### 3. **membershipDashboard.js**
UI components for displaying membership information and tier comparison.

**Key Functions:**
- `createMembershipCard(tier, isCurrentTier, currentRole)` - Create HTML for membership card
- `createMembershipDashboard(userData)` - Create full dashboard HTML
- `createMembershipComparisonTable()` - Create tier comparison table
- `getMembershipDashboardCSS()` - Get CSS styles for dashboard

**Example Usage:**
```javascript
import { createMembershipDashboard, getMembershipDashboardCSS } from './membershipDashboard.js';

// In your HTML page, add a container
document.getElementById('dashboard-container').innerHTML = createMembershipDashboard(userData);
document.head.innerHTML += getMembershipDashboardCSS();
```

## Membership Tiers

### 1. Free Member (Miễn phí)
- **Monthly Fee:** 0 ₫
- **Features:**
  - View products
  - Create basic listings (3/month)
  - Standard support
  - Basic seller rating

### 2. Plus Member (Thành viên Plus)
- **Monthly Fee:** 49,000 ₫
- **Features:**
  - Unlimited listings
  - Featured listings (5 spots/month)
  - Priority support
  - Advanced analytics
  - 2x boost visibility
  - Custom storefront
  - Seller badge
  - 5% transaction fee discount

### 3. Premium Member (Thành viên Premium)
- **Monthly Fee:** 149,000 ₫
- **Features:**
  - All Plus features
  - Unlimited featured listings
  - VIP 24/7 support
  - Advanced marketing tools
  - 5x boost visibility
  - Premium seller badge
  - 10% transaction fee discount
  - Dedicated account manager
  - Featured in "Top Sellers"

### 4. Business Member (Thành viên Kinh doanh)
- **Monthly Fee:** 499,000 ₫
- **Features:**
  - All Premium features
  - Multiple seller accounts
  - API access
  - Custom integrations
  - White-label options
  - Bulk listing tools
  - 20% transaction fee discount
  - Monthly consultation

## User Data Structure

New users are created with the following Firestore structure:

```javascript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  wallet: number,
  role: string,                    // 'free', 'plus', 'premium', 'business'
  membershipStatus: string,        // 'active' or 'inactive'
  membershipStartDate: timestamp,  // When current membership started
  membershipEndDate: timestamp,    // When current membership expires (null for free)
  createdAt: timestamp,
  updatedAt: timestamp,
  stats: {
    listingsCreated: number,       // Total listings created
    listingsActive: number,        // Currently active listings
    totalSales: number,            // Total transactions
    totalRevenue: number,          // Total revenue generated
    rating: number,                // Average rating (0-5)
    reviewCount: number            // Number of reviews
  }
}
```

## Implementation Guide

### Step 1: Update User Creation (auth.js)
✅ Already updated - new users now get default `role: 'free'`

### Step 2: Add Role-based Restrictions in Your App

**Check listing creation limit:**
```javascript
import { getUserActionLimit } from './roleManagement.js';

const limit = await getUserActionLimit(currentUserId, 'monthly_listings');
const currentCount = currentUserData.stats.listingsCreated;

if (currentCount >= limit) {
    alert('You have reached your listing limit. Upgrade to Plus to create unlimited listings!');
    return;
}
```

**Check feature access:**
```javascript
import { hasFeatureAccess } from './roleManagement.js';

const canViewAnalytics = await hasFeatureAccess(userId, 'analytics');
if (!canViewAnalytics) {
    // Show "Upgrade Required" message
}
```

### Step 3: Add Upgrade UI
Add a membership page to your app showing tier options:

```html
<div id="membership-dashboard"></div>

<script type="module">
import { createMembershipDashboard, getMembershipDashboardCSS } from './membershipDashboard.js';

const dashboardContainer = document.getElementById('membership-dashboard');
dashboardContainer.innerHTML = createMembershipDashboard(userData);
document.head.innerHTML += getMembershipDashboardCSS();
</script>
```

### Step 4: Handle Tier Upgrades
```javascript
import { upgradeUserRole } from './roleManagement.js';

async function upgradeToTier(tierId) {
    try {
        const success = await upgradeUserRole(currentUserId, tierId);
        if (success) {
            alert('Successfully upgraded to ' + tierId);
            location.reload();
        }
    } catch (error) {
        console.error('Upgrade failed:', error);
    }
}

// Make this function global or export it
window.upgradeToTier = upgradeToTier;
```

### Step 5: Apply Fee Discounts
When calculating transaction fees:

```javascript
import { getUserFeeDiscount, calculatePriceWithDiscount } from './roles.js';
import { getUserFeeDiscount as getUserDiscount } from './roleManagement.js';

const discount = await getUserDiscount(userId);
const transactionFee = price * 0.03 * (1 - discount); // Assuming 3% base fee
const finalPrice = price + transactionFee;
```

### Step 6: Set Up Auto-Downgrade for Expired Memberships
Call this periodically (e.g., when user logs in):

```javascript
import { autoDowngradeIfExpired } from './roleManagement.js';

// When user logs in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        await autoDowngradeIfExpired(user.uid);
    }
});
```

## Firestore Collections to Create

You should create a collection for role change history:

1. **roleChangeHistory** collection:
   - userId (string)
   - oldRole (string) - optional
   - newRole (string)
   - timestamp (timestamp)
   - reason (string) - e.g., "Upgrade", "Downgrade", "Membership expired"

## Features Implementation Checklist

- [ ] Create role information display page
- [ ] Add role badges to user profiles
- [ ] Implement listing limit checks
- [ ] Add featured listing functionality for Plus/Premium users
- [ ] Create boost visibility feature
- [ ] Implement transaction fee discounts
- [ ] Add analytics dashboard (Plus+)
- [ ] Create custom storefront templates
- [ ] Set up payment integration for tier upgrades
- [ ] Create admin panel for role management
- [ ] Set up email notifications for tier changes
- [ ] Implement automatic downgrade for expired memberships
- [ ] Add role change history page
- [ ] Create tier comparison page

## Payment Integration (Next Steps)

To complete the system, integrate with a payment provider:

**Recommended Options:**
1. **Stripe** - Full-featured, widely used
2. **PayPal** - Alternative payment option
3. **Momo** - Popular in Vietnam
4. **VNPay** - Vietnam-specific payment gateway

**Implementation would include:**
- Create payment intent/session when user clicks upgrade
- Redirect to payment provider
- Webhook to verify payment and update role
- Email confirmation
- Invoice generation

## Security Considerations

1. **Always verify role on backend** - Never trust client-side role claims
2. **Firestore Security Rules** - Implement rules to prevent unauthorized role changes
3. **Audit trail** - Maintain roleChangeHistory for compliance
4. **Rate limiting** - Prevent abuse of role upgrade/downgrade
5. **Admin verification** - Require admin approval for business tier changes

## Example Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid == userId || request.auth.uid == get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
      allow write: if request.auth.uid == userId && !hasFields(['role', 'membershipStatus', 'membershipEndDate']);
      allow update: if request.resource.data.role == resource.data.role; // Can't change own role
    }
    
    match /roleChangeHistory/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## API Endpoints for Backend (Optional)

If you need server-side role validation:

```javascript
// Example Express endpoints
app.post('/api/roles/:userId/upgrade', authenticateUser, async (req, res) => {
  // Verify payment
  // Update Firestore
  // Return success
});

app.get('/api/roles/:userId', authenticateUser, async (req, res) => {
  // Get user role and benefits
});

app.post('/api/roles/:userId/feature-check', authenticateUser, async (req, res) => {
  // Check if user can access feature
});
```

## Support & Benefits Display

Show benefits clearly to encourage upgrades:

```html
<div class="benefit-banner">
  <h2>Upgrade to Plus to Unlock:</h2>
  <ul>
    <li>✓ Unlimited listings</li>
    <li>✓ Featured exposure (5 spots/month)</li>
    <li>✓ Priority customer support</li>
    <li>✓ 5% discount on transaction fees</li>
  </ul>
  <button onclick="goToUpgrade()">Upgrade Now - 49,000₫/month</button>
</div>
```

---

**Last Updated:** May 2026
**Version:** 1.0.0
