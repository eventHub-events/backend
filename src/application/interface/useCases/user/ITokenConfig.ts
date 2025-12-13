import jwt from 'jsonwebtoken';
export interface ITokenConfig {
  jwtSecret: string;
  accessTokenExpiry: jwt.SignOptions['expiresIn'];
  refreshTokenExpiry: jwt.SignOptions['expiresIn'];
  resetTokenExpiry: jwt.SignOptions['expiresIn'];
}
