import { ErrorMessages } from '../../../../constants/errorMessages';
import { CreationFailedError } from '../../../../domain/errors/common';
import { IOrganizerDocumentsCloudinaryService } from '../../../../domain/interface/services/IOrganizerDocumentsCloudinaryService';
import { ICloudinaryGetSignatureResponseDTO } from '../../../DTOs/common/cloudinary/CloudinaryGetSignatureResponseDTO';
import { IGetKycUploadSignatureUseCase } from '../../../interface/useCases/common/cloudinary/IGetKycUploadSignatureUseCase';

export class GetKycUploadSignatureUseCase implements IGetKycUploadSignatureUseCase {
  constructor(
    private readonly _cloudinaryService: IOrganizerDocumentsCloudinaryService
  ) {}
  async execute(
    organizerId: string
  ): Promise<ICloudinaryGetSignatureResponseDTO> {
    const signature = await this._cloudinaryService.generateUploadSignature(
      `kyc/${organizerId}`
    );
    if (!signature)
      throw new CreationFailedError(
        ErrorMessages.CLOUDINARY.GENERATE_SIGNATURE_ERROR
      );
    return signature;
  }
}
