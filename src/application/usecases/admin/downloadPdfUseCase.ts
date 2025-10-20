import { Response } from "express";
import { IPdfService } from "../../../infrastructure/interface/IPdfService";
import { IDownloadPdfUseCase } from "../../interface/useCases/admin/IDownloadPdfUseCase";

export class DownloadPdfUseCase implements IDownloadPdfUseCase{
  constructor(private _pdfService:IPdfService){}
  async downloadDoc(imageUrl: string, res: Response, docType?: string): Promise<void> {
      await this._pdfService.generatePdfFromImage(imageUrl,res, docType)
  }
}