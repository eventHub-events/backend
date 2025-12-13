import { Response } from 'express';

export interface IDownloadPdfUseCase {
  downloadDoc(imageUrl: string, res: Response, docType?: string): Promise<void>;
}
