import { Response } from "express";
import { IPdfService } from "../../infrastructure/interface/IPdfService";
import { IDownloadPdfUseCase } from "../interface/admin/IDownloadPdfUseCase";

export class DownloadPdfUseCase implements IDownloadPdfUseCase{
  constructor(private _pdfService:IPdfService){}
  async downloadDoc(imageUrl: string, res: Response, organizerName?: string): Promise<void> {
      await this._pdfService.generatePdfFromImage(imageUrl,res,organizerName)
  }
}