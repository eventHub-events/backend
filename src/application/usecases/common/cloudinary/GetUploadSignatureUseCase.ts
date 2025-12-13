import { ErrorMessages } from "../../../../constants/errorMessages";
import { CreationFailedError, NotFoundError } from "../../../../domain/errors/common";
import { ICloudinaryService } from "../../../../domain/interface/services/ICloudinaryService";
import { ICloudinaryGetSignatureResponseDTO } from "../../../DTOs/common/cloudinary/CloudinaryGetSignatureResponseDTO";
import { IGetUploadSignatureUseCase } from "../../../interface/useCases/common/cloudinary/IGetUploadSignatureUseCase";

export class GetUploadSignatureUseCase implements IGetUploadSignatureUseCase {

   constructor(
     private readonly _cloudinaryService : ICloudinaryService
   ){}
  async execute(folder: string): Promise<ICloudinaryGetSignatureResponseDTO> {

      const signature = await this._cloudinaryService.generateUploadSignature({folder});
      if(!signature) throw new CreationFailedError(ErrorMessages.CLOUDINARY.GENERATE_SIGNATURE_ERROR);
    return signature;
  }
}