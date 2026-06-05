/**
 * Admin System Utilities
 * Device-based admin role management
 */

// Admin configuration
const ADMIN_PASSCODE = '27092012Ken';

/**
 * Generate device ID based on browser/device fingerprint
 * @returns {string} - Encoded device ID
 */
export function generateDeviceId() {
    return btoa(navigator.userAgent + navigator.language);
}

/**
 * Get device admin key for localStorage
 * @returns {string} - Admin device key
 */
export function getAdminDeviceKey() {
    return 'adminDevice_' + generateDeviceId();
}

/**
 * Check if current device is admin
 * @returns {boolean} - True if device is admin
 */
export function isAdminDevice() {
    return localStorage.getItem(getAdminDeviceKey()) === 'true';
}

/**
 * Set current device as admin
 */
export function setAdminDevice() {
    localStorage.setItem(getAdminDeviceKey(), 'true');
}

/**
 * Remove admin status from device
 */
export function removeAdminDevice() {
    localStorage.removeItem(getAdminDeviceKey());
}

/**
 * Verify admin passcode
 * @param {string} passcode - Passcode to verify
 * @returns {boolean} - True if correct
 */
export function verifyAdminPasscode(passcode) {
    return passcode === ADMIN_PASSCODE;
}

/**
 * Get all admin devices (for admin panel)
 * @returns {Array} - Array of admin device keys
 */
export function getAllAdminDevices() {
    const devices = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('adminDevice_')) {
            devices.push(key);
        }
    }
    return devices;
}

/**
 * Remove specific admin device
 * @param {string} deviceKey - Device key to remove
 */
export function removeAdminDeviceByKey(deviceKey) {
    localStorage.removeItem(deviceKey);
}

/**
 * Get admin status display info
 * @returns {Object} - Admin status info
 */
export function getAdminStatus() {
    return {
        isAdmin: isAdminDevice(),
        deviceId: generateDeviceId(),
        deviceKey: getAdminDeviceKey(),
        adminDevices: getAllAdminDevices().length
    };
}

/**
 * Lock/unlock admin access (optional security layer)
 */
const adminLockKey = 'adminLocked_' + generateDeviceId();

export function isAdminLocked() {
    return localStorage.getItem(adminLockKey) === 'true';
}

export function lockAdmin() {
    localStorage.setItem(adminLockKey, 'true');
}

export function unlockAdmin() {
    localStorage.removeItem(adminLockKey);
}

/**
 * Get admin security info
 * @returns {Object}
 */
export function getAdminSecurityInfo() {
    return {
        isAdmin: isAdminDevice(),
        isLocked: isAdminLocked(),
        lastUpdate: localStorage.getItem('adminLastUpdate_' + generateDeviceId()),
        totalAdminDevices: getAllAdminDevices().length
    };
}

/**
 * Log admin activity
 * @param {string} action - Action performed
 * @param {Object} details - Additional details
 */
export function logAdminActivity(action, details = {}) {
    const log = {
        action: action,
        timestamp: new Date().toISOString(),
        deviceId: generateDeviceId(),
        ...details
    };
    
    // Store in localStorage
    const logsKey = 'adminLogs_' + generateDeviceId();
    const existingLogs = JSON.parse(localStorage.getItem(logsKey) || '[]');
    existingLogs.push(log);
    
    // Keep only last 100 logs
    if (existingLogs.length > 100) {
        existingLogs.shift();
    }
    
    localStorage.setItem(logsKey, JSON.stringify(existingLogs));
}

/**
 * Get admin activity logs
 * @returns {Array} - Activity logs
 */
export function getAdminActivityLogs() {
    const logsKey = 'adminLogs_' + generateDeviceId();
    return JSON.parse(localStorage.getItem(logsKey) || '[]');
}

/**
 * Clear admin activity logs
 */
export function clearAdminActivityLogs() {
    const logsKey = 'adminLogs_' + generateDeviceId();
    localStorage.removeItem(logsKey);
}
