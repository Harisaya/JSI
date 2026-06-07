/**
 * User Role Management System
 * Handles role upgrades, permissions, and membership features
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, doc, updateDoc, getDoc, query, collection, where, getDocs, addDoc, serverTimestamp, increment } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

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
const db = getFirestore(app);

/**
 * Upgrade user to a new role/membership tier
 * @param {string} userId - The user ID
 * @param {string} newRole - The new role (free, plus, premium, business)
 * @returns {Promise<boolean>} - Success status
 */
export async function upgradeUserRole(userId, newRole) {
    try {
        const validRoles = ['free', 'starter', 'plus', 'premium', 'business', 'enterprise'];
        if (!validRoles.includes(newRole)) {
            throw new Error('Invalid role');
        }

        const userRef = doc(db, 'users', userId);
        const now = new Date();
        let endDate = null;

        // Calculate membership end date (30 days from now)
        if (newRole !== 'free') {
            endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        }

        await updateDoc(userRef, {
            role: newRole,
            membershipStatus: 'active',
            membershipStartDate: serverTimestamp(),
            membershipEndDate: endDate,
            updatedAt: serverTimestamp()
        });

        // Log role change
        await addDoc(collection(db, 'roleChangeHistory'), {
            userId: userId,
            oldRole: (await getDoc(userRef)).data().role,
            newRole: newRole,
            timestamp: serverTimestamp(),
            reason: 'Upgrade'
        });

        return true;
    } catch (error) {
        console.error('Error upgrading user role:', error);
        return false;
    }
}

/**
 * Downgrade user to a lower role
 * @param {string} userId - The user ID
 * @param {string} newRole - The new role
 * @param {string} reason - Reason for downgrade
 * @returns {Promise<boolean>}
 */
export async function downgradeUserRole(userId, newRole, reason = 'Manual downgrade') {
    try {
        const userRef = doc(db, 'users', userId);
        
        await updateDoc(userRef, {
            role: newRole,
            membershipStatus: newRole === 'free' ? 'inactive' : 'active',
            membershipEndDate: null,
            updatedAt: serverTimestamp()
        });

        await addDoc(collection(db, 'roleChangeHistory'), {
            userId: userId,
            newRole: newRole,
            timestamp: serverTimestamp(),
            reason: reason
        });

        return true;
    } catch (error) {
        console.error('Error downgrading user role:', error);
        return false;
    }
}

/**
 * Get user's current role and membership details
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - User role and membership data
 */
export async function getUserRole(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return null;
        }

        const userData = userSnap.data();
        return {
            role: userData.role || 'free',
            membershipStatus: userData.membershipStatus || 'active',
            membershipStartDate: userData.membershipStartDate,
            membershipEndDate: userData.membershipEndDate
        };
    } catch (error) {
        console.error('Error getting user role:', error);
        return null;
    }
}

/**
 * Check if user has access to a specific feature
 * @param {string} userId - The user ID
 * @param {string} featureName - Feature to check
 * @returns {Promise<boolean>}
 */
export async function hasFeatureAccess(userId, featureName) {
    try {
        const userRole = await getUserRole(userId);
        if (!userRole) return false;

        const featureRequirements = {
            'unlimited_listings': ['plus', 'premium', 'business'],
            'featured_listings': ['plus', 'premium', 'business'],
            'advanced_analytics': ['plus', 'premium', 'business'],
            'priority_support': ['plus', 'premium', 'business'],
            'custom_storefront': ['plus', 'premium', 'business'],
            'bulk_upload': ['premium', 'business'],
            'api_access': ['business'],
            'multiple_accounts': ['business'],
            'vip_support': ['premium', 'business']
        };

        const requiredRoles = featureRequirements[featureName] || [];
        return requiredRoles.includes(userRole.role);
    } catch (error) {
        console.error('Error checking feature access:', error);
        return false;
    }
}

/**
 * Get user's action limits based on role
 * @param {string} userId - The user ID
 * @param {string} actionType - Type of action
 * @returns {Promise<number>} - Action limit
 */
export async function getUserActionLimit(userId, actionType) {
    try {
        const userRole = await getUserRole(userId);
        if (!userRole) return 0;

        const actionLimits = {
            'monthly_listings': {
                'free': 3,
                'plus': 50,
                'premium': 200,
                'business': Infinity
            },
            'featured_spots': {
                'free': 0,
                'plus': 5,
                'premium': 20,
                'business': Infinity
            },
            'boost_visibility': {
                'free': 0,
                'plus': 2,
                'premium': 10,
                'business': Infinity
            }
        };

        return actionLimits[actionType]?.[userRole.role] ?? 0;
    } catch (error) {
        console.error('Error getting action limit:', error);
        return 0;
    }
}

/**
 * Get transaction fee discount for user's role
 * @param {string} userId - The user ID
 * @returns {Promise<number>} - Discount percentage (0-0.2)
 */
export async function getUserFeeDiscount(userId) {
    try {
        const userRole = await getUserRole(userId);
        if (!userRole) return 0;

        const discounts = {
            'free': 0,
            'plus': 0.05,
            'premium': 0.10,
            'business': 0.20
        };

        return discounts[userRole.role] || 0;
    } catch (error) {
        console.error('Error getting fee discount:', error);
        return 0;
    }
}

/**
 * Update user stats (listings created, sales, etc.)
 * @param {string} userId - The user ID
 * @param {Object} statUpdates - Stats to update
 * @returns {Promise<boolean>}
 */
export async function updateUserStats(userId, statUpdates) {
    try {
        const userRef = doc(db, 'users', userId);
        const stats = {};

        for (const [key, value] of Object.entries(statUpdates)) {
            stats[`stats.${key}`] = value;
        }

        await updateDoc(userRef, stats);
        return true;
    } catch (error) {
        console.error('Error updating user stats:', error);
        return false;
    }
}

/**
 * Increment user stat (for counters)
 * @param {string} userId - The user ID
 * @param {string} stat - Stat name
 * @param {number} amount - Amount to increment
 * @returns {Promise<boolean>}
 */
export async function incrementUserStat(userId, stat, amount = 1) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            [`stats.${stat}`]: increment(amount)
        });
        return true;
    } catch (error) {
        console.error('Error incrementing user stat:', error);
        return false;
    }
}

/**
 * Check if membership has expired
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>}
 */
export async function isMembershipExpired(userId) {
    try {
        const userRole = await getUserRole(userId);
        if (!userRole || userRole.role === 'free') {
            return false; // Free tier doesn't expire
        }

        if (!userRole.membershipEndDate) {
            return false;
        }

        const now = new Date();
        const endDate = new Date(userRole.membershipEndDate.seconds * 1000);
        return now > endDate;
    } catch (error) {
        console.error('Error checking membership expiration:', error);
        return false;
    }
}

/**
 * Auto-downgrade expired premium memberships to free
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>}
 */
export async function autoDowngradeIfExpired(userId) {
    try {
        const isExpired = await isMembershipExpired(userId);
        if (isExpired) {
            return await downgradeUserRole(userId, 'free', 'Membership expired');
        }
        return false;
    } catch (error) {
        console.error('Error in auto-downgrade:', error);
        return false;
    }
}

/**
 * Get all users with a specific role
 * @param {string} role - The role to filter by
 * @returns {Promise<Array>}
 */
export async function getUsersByRole(role) {
    try {
        const q = query(collection(db, 'users'), where('role', '==', role));
        const querySnapshot = await getDocs(q);
        
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return users;
    } catch (error) {
        console.error('Error getting users by role:', error);
        return [];
    }
}

/**
 * Get role change history for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>}
 */
export async function getRoleChangeHistory(userId) {
    try {
        const q = query(collection(db, 'roleChangeHistory'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const history = [];
        querySnapshot.forEach((doc) => {
            history.push({
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate?.() || new Date()
            });
        });

        return history.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
        console.error('Error getting role change history:', error);
        return [];
    }
}
