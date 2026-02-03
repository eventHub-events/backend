import { NextFunction, Request, Response } from 'express';
import { IOrganizerProfileUseCase } from '../../../application/interface/useCases/organizer/IOrganizerProfileUseCase';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class OrganizerProfileController {
  constructor(private _organizerProfileUseCase: IOrganizerProfileUseCase) {}

  async updateOrganizerProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      }
      const profileData = req.body;

      if (!profileData) {
        throw new CustomError(
          ErrorMessages.PROFILE.DETAILS_EMPTY,
          HttpStatusCode.BAD_REQUEST
        );
      }
      const updatedProfileData =
        await this._organizerProfileUseCase.updateOrganizerProfile(
          id,
          profileData
        );

      if (!updatedProfileData) {
        throw new CustomError(
          ErrorMessages.PROFILE.UPDATE_FAILURE,
          HttpStatusCode.BAD_REQUEST
        );
      }
      return res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.PROFILE.PROFILE_CREATION_SUCCESS,
            updatedProfileData
          )
        );
    } catch (err: unknown) {
      next(err);
    }
  }

  async fetchOrganizerProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      }
      const profileData =
        await this._organizerProfileUseCase.getOrganizerProfile(id);

      if (!profileData) {
        throw new CustomError(
          ErrorMessages.PROFILE.PROFILE_FETCH_FAILURE,
          HttpStatusCode.NOT_FOUND
        );
      }
      return res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.PROFILE.PROFILE_DATA_FETCH_SUCCESS,
            profileData
          )
        );
    } catch (err: unknown) {
      next(err);
    }
  }
}
