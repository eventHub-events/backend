import { CookieOptions } from 'express';

// export class CookieOptionsUtility {
//   static create(maxAge?: number): CookieOptions {
//     return {
//       httpOnly: true,
//       secure: true,
//       sameSite:'none',
//       maxAge,
//     };
//   }
// }
export class CookieOptionsUtility {
 static create(maxAge?: number): CookieOptions {
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  if (maxAge !== undefined) {
    options.maxAge = maxAge;
  }

  return options;
}
}
