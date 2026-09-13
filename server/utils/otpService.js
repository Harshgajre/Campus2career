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
    throw new Error('SMS OTP service is not configured. Set OTP_API_KEY before enabling student login.');
  }

  // Fast2SMS OTP gateway. A failed dispatch must fail the login request; an OTP
  // that never reached the phone is not a valid authentication factor.
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
  } catch (error) {
    console.error('❌ [SMS OTP] Fast2SMS dispatch failed:', error.response?.data || error.message);
    throw new Error('Unable to send SMS OTP. Please try again later.');
  }

  throw new Error('SMS provider rejected the OTP request.');
};
