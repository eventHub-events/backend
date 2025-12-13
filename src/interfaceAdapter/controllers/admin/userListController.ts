import { NextFunction, Response } from 'express';
import { IFetchUserUseCase } from '../../../application/interface/useCases/admin/IFetchUsersUseCase';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { UserFilterOptions } from '../../../infrastructure/validation/schemas/admin/userFilterOptionSchema';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class UserListController {
  constructor(private _fetchUserUseCase: IFetchUserUseCase) {}

  async fetchUsers(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as UserFilterOptions;
      const result = await this._fetchUserUseCase.fetchUsers(filter);

      if (!result)
        throw new CustomError(
          ErrorMessages.USER.NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );

      const { usersList, total } = result;

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.USER.USER_LIST.USER_LIST_FETCH_SUCCESS,
            HttpStatusCode.OK,
            { usersList, total }
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async UpdateUser(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, data } = req.body;
      const result = await this._fetchUserUseCase.updateUser(id, data);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.USER.USER_LIST.USER_DATA_UPDATE_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
