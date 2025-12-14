import { ICloudinaryGetSignatureResponseDTO } from '../../../../DTOs/common/cloudinary/CloudinaryGetSignatureResponseDTO';

export interface IGetKycUploadSignatureUseCase {
  execute(organizerId: string): Promise<ICloudinaryGetSignatureResponseDTO>;
}
