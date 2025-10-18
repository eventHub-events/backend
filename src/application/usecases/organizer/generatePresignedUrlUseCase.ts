import { IS3Service } from "../../../infrastructure/interface/IS3Service";
import { IGeneratePresignedUrlUseCase } from "../../interface/useCases/organizer/IGeneratePresignedUrlUseCase";


export class GeneratePresignedUrlUseCase implements IGeneratePresignedUrlUseCase{
  constructor(private _s3Service:IS3Service){}
  async execute(fileName: string, contentType: string): Promise<string> {
      const key=`organizer-documents/${Date.now()}-${fileName}`;
      return this._s3Service.generatePresignedUrl(key,contentType)
  }
  async getViewUrl(key: string): Promise<string> {
      return  this._s3Service.generateViewUrl(key);
  }
}