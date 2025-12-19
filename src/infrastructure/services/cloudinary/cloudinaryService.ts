import { ICloudinaryService } from '../../../domain/interface/services/ICloudinaryService';
import { ENV } from '../../config/common/env';
import cloudinary from './cloudinary';

export class CloudinaryService implements ICloudinaryService {
  async generateUploadSignature(params: { folder: string }): Promise<{
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
    folder: string;
  }> {
    const { folder } = params;
    const timestamp = Math.floor(Date.now() / 100);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
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
}
