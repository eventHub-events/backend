import { ICloudinaryGetSignatureResponseDTO } from "../../../../DTOs/common/cloudinary/CloudinaryGetSignatureResponseDTO";

export interface IGetUploadSignatureUseCase {
  execute(folder : string):Promise<ICloudinaryGetSignatureResponseDTO>;
}