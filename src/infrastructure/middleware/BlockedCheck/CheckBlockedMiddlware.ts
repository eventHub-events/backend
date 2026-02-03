import { NextFunction, Response } from 'express';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { IAuthenticatedRequest } from '../../interface/IAuthenticatedRequest';
import { CustomError } from '../../errors/errorClass';
import { ErrorMessages } from '../../../constants/errorMessages';
import { HttpStatusCode } from '../../interface/enums/HttpStatusCode';
import { NotFoundError } from '../../../domain/errors/common';
import { ApiResponse } from '../../commonResponseModel/ApiResponse';

export class CheckBlockedMiddleware {
  constructor(private _userRepo: IUserRepository) {}
  execute = async (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    console.log('🟡 CheckBlockedMiddleware → START');
    console.log('Incoming req.user in CheckBlocked:', req.user);

    const userId = req.user?.id;
    console.log('User ID from req.user →', userId);
    if (!userId)
      throw new CustomError(
        ErrorMessages.USER.ID_REQUIRED,
        HttpStatusCode.BAD_REQUEST
      );

    const user = await this._userRepo.findUserById(userId);

    if (!user) throw new NotFoundError(ErrorMessages.USER.NOT_FOUND);

    if (user.isBlocked) {
      console.log('🔴 USER IS BLOCKED — RETURNING 403');
      return res
        .status(HttpStatusCode.FORBIDDEN)
        .json(
          ApiResponse.error(
            ErrorMessages.AUTH.BLOCK_ERROR,
            ErrorMessages.ERROR_CODES.USER_BLOCKED,
            user.role
          )
        );
    }

    next();
  };
}
