module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || '!!CryptoCat@!!',
  jwtExpirationInSeconds: process.env.JWT_EXPIRATION || 3600, // 1 hour
  roles: {
    USER: 'user',
    ADMIN: 'admin'
  },
  productPriceUnits: {
    DOLLAR: 'dollar',
    EURO: 'euro',
    INR: 'inr'
  }
};
