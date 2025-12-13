import axios from 'axios';
import { IPdfService } from '../../interface/IPdfService';
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { HttpStatusCode } from '../../interface/enums/HttpStatusCode';
import { HandleErrorUtility } from '../../../utils/HandleErrorUtility';

export class PdfService implements IPdfService {
  async generatePdfFromImage(
    imageUrl: string,
    res: Response,
    docType?: string
  ): Promise<void> {
    const doc = new PDFDocument({ autoFirstPage: false });
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=organizer-document.pdf`
      );

      doc.pipe(res);
      doc.addPage({ size: 'A4', margin: 50 });
      doc
        .fontSize(16)
        .text('Organizer Document', { align: 'center' })
        .moveDown();
      if (docType) {
        doc
          .fontSize(12)
          .text(`Document type: ${docType}`, { align: 'center' })
          .moveDown();
      }
      doc.image(imageBuffer, {
        fit: [500, 400],
        align: 'center',
        valign: 'center',
      });
      doc.end();
    } catch (error) {
      const err = HandleErrorUtility.handleError(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  }
}
