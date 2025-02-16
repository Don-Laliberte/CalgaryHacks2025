const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Increase salt rounds for better security (but slower hashing)
const SALT_ROUNDS = 12;

// Add pepper (additional secret key) for extra security
const PEPPER = process.env.ENCRYPTION_PEPPER || crypto.randomBytes(32).toString('hex');

/**
 * Generate a secure random string for use as password reset tokens
 * @param {number} length - Length of the random string
 * @returns {string} Secure random string
 */
const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Add pepper to password before hashing
 * @param {string} password - The plain text password
 * @returns {string} Password with pepper
 */
const pepperPassword = (password) => {
  return crypto.createHmac('sha256', PEPPER)
    .update(password)
    .digest('hex');
};

/**
 * Hash a password using bcrypt with additional security measures
 * @param {string} password - The plain text password to hash
 * @returns {Promise<{hash: string, salt: string}>} The hashed password and salt
 * @throws {Error} If password doesn't meet requirements
 */
const hashPassword = async (password) => {
  try {
    // Validate password requirements
    if (!isPasswordValid(password)) {
      throw new Error('Password does not meet security requirements');
    }

    // Add pepper to password
    const pepperedPassword = pepperPassword(password);

    // Generate a unique salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the peppered password
    const hash = await bcrypt.hash(pepperedPassword, salt);

    // Return both hash and salt (salt might be needed for password reset)
    return {
      hash,
      salt
    };
  } catch (error) {
    console.error('Password hashing error:', error.message);
    throw new Error('Password hashing failed');
  }
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password to check
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    // Add pepper to password before comparison
    const pepperedPassword = pepperPassword(password);
    
    // Compare passwords
    return await bcrypt.compare(pepperedPassword, hashedPassword);
  } catch (error) {
    console.error('Password comparison error:', error.message);
    throw new Error('Password comparison failed');
  }
};

/**
 * Validate password requirements
 * @param {string} password - The password to validate
 * @returns {boolean} True if password meets requirements
 */
const isPasswordValid = (password) => {
  // Minimum length of 8 characters
  if (password.length < 8) return false;

  // Must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) return false;

  // Must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) return false;

  // Must contain at least one number
  if (!/\d/.test(password)) return false;

  // Must contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};

/**
 * Generate a time-limited reset token
 * @returns {Promise<{token: string, expires: Date}>}
 */
const generateResetToken = async () => {
  const token = generateSecureToken();
  const expires = new Date(Date.now() + 3600000); // 1 hour expiration
  
  // Hash the token before storing it
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
  return {
    token,
    hashedToken,
    expires
  };
};

/**
 * Verify if a password hash is still secure (not too old)
 * @param {string} hash - The password hash to check
 * @param {Date} hashDate - The date the hash was created
 * @returns {boolean} True if hash needs to be updated
 */
const isHashOutdated = (hashDate) => {
  const MAX_HASH_AGE = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
  return Date.now() - hashDate.getTime() > MAX_HASH_AGE;
};

module.exports = {
  hashPassword,
  comparePassword,
  generateResetToken,
  isHashOutdated,
  isPasswordValid,
  generateSecureToken
};
