const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'campus2career_super_secret_jwt_key_2026_sih',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

module.exports = generateToken;
