import { NextFunction, Response } from "express";
import { IAuthMiddleware } from "../../application/interface/user/IAuthMiddleware";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../infrastructure/commonResponseModel/ApiResponse";
import { IAuthenticatedRequest } from "../../infrastructure/interface/IAuthenticatedRequest";
import { IRefreshTokenUseCase } from "../../application/interface/user/IRefreshTokenUseCase";

export class AuthenticationMiddleWare {
  constructor(
    private _authMiddlewareService: IAuthMiddleware,
    private _refreshTokenUseCase: IRefreshTokenUseCase
  ) {}

  async authenticateUser(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let accessToken = req.cookies?.authToken;
      const refreshToken = req.cookies?.refreshToken;
      if (!accessToken && refreshToken) {
        const token = await this._refreshTokenUseCase.generateAccessToken(
          refreshToken
        );
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        accessToken = token;
      }
      if (!refreshToken && accessToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(ApiResponse.error("Unauthorized", HttpStatusCode.UNAUTHORIZED));
      }

      const resetToken = req.cookies?.resetToken ?? null;

      const decoded = await this._authMiddlewareService.authenticateUser(
        accessToken
      );
      req.user = decoded;
      req.resetToken = resetToken;
      next();
    } catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          ApiResponse.error(
            "Invalid or expired token",
            HttpStatusCode.UNAUTHORIZED
          )
        );
    }
  }
  async authenticateChangePassword(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const resetToken = req.cookies?.resetToken ?? null;
      console.log("reset token is ",resetToken)
      if (!resetToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(
            ApiResponse.error(
              "Unauthorized to reset password",
              HttpStatusCode.UNAUTHORIZED
            )
          );
      }
   console.log("Middleware: before authenticateUser");
const decoded = await this._authMiddlewareService.authenticateUser(resetToken);
console.log("Middleware: after authenticateUser");
      req.user = decoded;
      req.resetToken = resetToken;
      next();
    } catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          ApiResponse.error(
            "Invalid or expired token",
            HttpStatusCode.UNAUTHORIZED
          )
        );
    }
  }

  async validateRefreshToken(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(
            ApiResponse.error(
              "refreshToken missing",
              HttpStatusCode.UNAUTHORIZED
            )
          );
      }
      const decoded = await this._authMiddlewareService.validateRefreshToken(
        refreshToken
      );
      req.refreshToken = refreshToken;
      req.user = decoded;
      next();
    } catch (err: unknown) {
      const errMessage = err instanceof Error? err.message : "Invalid or expired refresh token" 
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          ApiResponse.error(
           errMessage,
            HttpStatusCode.UNAUTHORIZED
          )
        );
    }
  }
}
