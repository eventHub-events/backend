import { Response } from "express";

export interface IPdfService{
  generatePdfFromImage(imageUrl:string,res:Response,organizerName?:string):Promise<void>
}