import { CookieOptions } from 'express';

export class CookieOptionsUtility {
  static create(maxAge?: number): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:'none',
      maxAge,
    };
  }
}
