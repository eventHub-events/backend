import { ICloudinaryGetSignatureResponseDTO } from '../../../application/DTOs/common/cloudinary/CloudinaryGetSignatureResponseDTO';

export interface IOrganizerDocumentsCloudinaryService {
  generateUploadSignature(
    folder: string
  ): Promise<ICloudinaryGetSignatureResponseDTO>;
  generateSignedDownloadUrl(publicId: string): Promise<string>;
}
