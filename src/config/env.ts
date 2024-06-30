export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST,
    jwtSecret: process.env.JWT_SECRET,
    accessTokenDuration: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenDuration: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });