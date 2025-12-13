import streamifier from 'streamifier';
import { IStorageService } from '../../../application/service/common/IStorageService';
import cloudinary from '../cloudinary/cloudinary';

export class CloudinaryStorageService implements IStorageService {
  async uploadBuffer(buffer: Buffer, filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: filePath,
          folder: 'tickets',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!.secure_url);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  }
}
