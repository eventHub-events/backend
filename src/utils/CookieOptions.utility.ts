import { CookieOptions } from 'express';

export class CookieOptionsUtility {
  static create(maxAge?: number): CookieOptions {
    return {
      httpOnly: true,
      secure: true,
      sameSite:'none',
      maxAge,
    };
  }
}
