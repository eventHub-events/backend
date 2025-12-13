import { ICloudinaryService } from "../../../domain/interface/services/ICloudinaryService";
import cloudinary from "./cloudinary";
import dotenv from "dotenv";
dotenv.config();

export class CloudinaryService implements ICloudinaryService {

  async generateUploadSignature(params: { folder: string; }): Promise<{ signature: string; timestamp: number; apiKey: string; cloudName: string; folder: string; }> {
     const{folder} = params;
      const timestamp  = Math.floor(Date.now()/100);

      const signature = cloudinary.utils.api_sign_request(
         {
           timestamp,
           folder,
         },
         process.env.CLOUDINARY_API_SECRET!
      );

      return {
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      folder,
      }
  }
}