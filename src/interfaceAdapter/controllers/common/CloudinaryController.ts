import { NextFunction, Response } from 'express';
import { IGetUploadSignatureUseCase } from '../../../application/interface/useCases/common/cloudinary/IGetUploadSignatureUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { ErrorMessages } from '../../../constants/errorMessages';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IGetKycUploadSignatureUseCase } from '../../../application/interface/useCases/common/cloudinary/IGetKycUploadSignatureUseCase';
import { IGenerateSignedDownloadUrlUseCase } from '../../../application/interface/useCases/common/cloudinary/IGeneareteSignedDownloadUrl';

export class CloudinaryController {
  constructor(
    private readonly _getUploadSignatureUseCase: IGetUploadSignatureUseCase,
    private readonly _getKycUploadSignatureUseCase: IGetKycUploadSignatureUseCase,
    private readonly _generateSignedDownloadUrlUseCase: IGenerateSignedDownloadUrlUseCase
  ) {}

  async getSignature(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const folder = req.query.folder as string;

      if (!folder)
        throw new CustomError(
          ErrorMessages.CLOUDINARY.FOLDER_REQUIRED_ERROR,
          HttpStatusCode.BAD_REQUEST
        );
      const data = await this._getUploadSignatureUseCase.execute(folder);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.CLOUDINARY.CLOUDINARY_SIGNATURE_CREATION_SUCCESS,
            data
          )
        );
    } catch (err) {
      next(err);
    }
  }

  async getKycUploadSignature(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { organizerId } = req.params;
      if (!organizerId)
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const signatureData =
        await this._getKycUploadSignatureUseCase.execute(organizerId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.CLOUDINARY.CLOUDINARY_SIGNATURE_CREATION_SUCCESS,
            signatureData
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getSignedDocumentUrl(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { publicId } = req.query;
    
      const signedUrl = await this._generateSignedDownloadUrlUseCase.execute(
        publicId as string
      );
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.CLOUDINARY.CLOUDINARY_DOWNLOAD_URL_SUCCESS,
            signedUrl
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
