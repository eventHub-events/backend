import { IS3Service } from "../../infrastructure/interface/IS3Service";
import { IGeneratePresignedUrlUseCase } from "../interface/organizer/IGeneratePresignedUrlUseCase";


export class GeneratePresignedUrlUseCase implements IGeneratePresignedUrlUseCase{
  constructor(private _s3Service:IS3Service){}
  async execute(fileName: string, contentType: string): Promise<string> {
      const key=`organizer-documents/${Date.now()}-${fileName}`;
      return this._s3Service.generatePresignedUrl(key,contentType)
  }
}