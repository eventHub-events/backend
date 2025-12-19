import { ErrorMessages } from '../../../../constants/errorMessages';
import { CreationFailedError } from '../../../../domain/errors/common';
import { IOrganizerDocumentsCloudinaryService } from '../../../../domain/interface/services/IOrganizerDocumentsCloudinaryService';
import { IGenerateSignedDownloadUrlUseCase } from '../../../interface/useCases/common/cloudinary/IGeneareteSignedDownloadUrl';

export class GenerateSignedDownloadUrlUseCase implements IGenerateSignedDownloadUrlUseCase {
  constructor(
    private _cloudinaryService: IOrganizerDocumentsCloudinaryService
  ) {}
  async execute(publicId: string): Promise<string> {
    const url =
      await this._cloudinaryService.generateSignedDownloadUrl(publicId);
    if (!url)
      throw new CreationFailedError(
        ErrorMessages.CLOUDINARY.SIGNED_URL_CREATION_FAILED
      );

    return url;
  }
}
