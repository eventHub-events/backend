import { ICloudinaryGetSignatureResponseDTO } from '../../../application/DTOs/common/cloudinary/CloudinaryGetSignatureResponseDTO';
import { IOrganizerDocumentsCloudinaryService } from '../../../domain/interface/services/IOrganizerDocumentsCloudinaryService';
import { ENV } from '../../config/common/env';
import cloudinary from './cloudinary';

export class OrganizerDocumentsCloudinaryService implements IOrganizerDocumentsCloudinaryService {
  async generateUploadSignature(
    folder: string
  ): Promise<ICloudinaryGetSignatureResponseDTO> {
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
      timestamp,
      folder,
      // access_mode : "private",
      type: 'authenticated',
      // resource_type :"raw"
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      ENV.CLOUDINARY_API_SECRET!
    );

    return {
      timestamp,
      signature,
      apiKey: ENV.CLOUDINARY_API_KEY!,
      cloudName: ENV.CLOUDINARY_CLOUD_NAME!,
      folder,
    };
  }

  async generateSignedDownloadUrl(publicId: string): Promise<string> {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      // type : "private",
      type: 'authenticated',
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 300,
    });
  }
}
