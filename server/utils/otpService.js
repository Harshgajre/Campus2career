const crypto = require('crypto');
const axios = require('axios');

/**
 * Generate a cryptographically secure 6-digit OTP
 */
exports.generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

/**
 * Hash OTP using SHA-256 for secure database storage
 */
exports.hashOTP = (otp) => {
  return crypto.createHash('sha256').update(String(otp).trim()).digest('hex');
};

/**
 * Securely verify OTP against stored hash with constant-time comparison
 */
exports.verifyOTPHash = (enteredOtp, storedHash) => {
  if (!enteredOtp || !storedHash) return false;
  const enteredHash = crypto.createHash('sha256').update(String(enteredOtp).trim()).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(enteredHash, 'hex'), Buffer.from(storedHash, 'hex'));
  } catch {
    return false;
  }
};

/**
 * Send real SMS OTP to phone via SMS Gateway using OTP_API_KEY from server/.env
 */
exports.sendSMSOTP = async (phone, otp) => {
  const apiKey = process.env.OTP_API_KEY;
  const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);

  if (!apiKey || apiKey === 'YOUR_OTP_API_KEY_HERE') {
    console.warn('⚠️ [OTP SERVICE] OTP_API_KEY is not configured in server/.env.');
    return { success: false, message: 'OTP_API_KEY not set in server/.env' };
  }

  // 1. Try Fast2SMS Gateway (standard route: 'otp')
  try {
    const fast2smsRes = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'otp',
        variables_values: otp,
        numbers: cleanPhone,
      },
      {
        headers: {
          authorization: apiKey,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    if (fast2smsRes.data && (fast2smsRes.data.return === true || fast2smsRes.data.status_code === 200)) {
      console.log(`✅ [SMS OTP] Fast2SMS dispatched successfully to +91 ${cleanPhone}`);
      return { success: true, provider: 'Fast2SMS', data: fast2smsRes.data };
    }
  } catch (fastErr) {
    // 2. Fallback to 2Factor SMS Gateway
    try {
      const twoFactorRes = await axios.get(
        `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}/SMS/${cleanPhone}/${otp}/Campus2Career`,
        { timeout: 10000 }
      );
      if (twoFactorRes.data && twoFactorRes.data.Status === 'Success') {
        console.log(`✅ [SMS OTP] 2Factor dispatched successfully to +91 ${cleanPhone}`);
        return { success: true, provider: '2Factor', data: twoFactorRes.data };
      }
    } catch (twoErr) {
      console.error('❌ [SMS OTP] SMS Gateway Error:', fastErr.response?.data || fastErr.message, twoErr.response?.data || twoErr.message);
      return { success: false, error: fastErr.response?.data || fastErr.message };
    }
  }

  return { success: true };
};
