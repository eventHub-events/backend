import { DownloadPdfUseCase } from "../../application/admin/downloadPdfUseCase";
import { FetchUserUseCase } from "../../application/admin/fetchUsersUsecase";
import { PdfService } from "../../infrastructure/services/pdfService/pdfService";
import { DownloadPdfController } from "../../interface/controllers/admin/DownloadPefController";
import { UserListController } from "../../interface/controllers/admin/userListController";
import { userRepository } from "../container";



export const  fetchUserUseCase= new FetchUserUseCase(userRepository)
export const usersListController= new UserListController(fetchUserUseCase)
const pdfService= new PdfService()
const downloadPdfUseCase= new DownloadPdfUseCase(pdfService)
export const downloadPdfController= new DownloadPdfController(downloadPdfUseCase)