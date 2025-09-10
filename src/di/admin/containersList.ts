import { DownloadPdfUseCase } from "../../application/admin/downloadPdfUseCase";
import { FetchUserUseCase } from "../../application/admin/fetchUsersUsecase";
import { OrganizerVerificationUseCase } from "../../application/admin/organizerVerificationUseCase";
import { PdfService } from "../../infrastructure/services/pdfService/pdfService";
import { DownloadPdfController } from "../../interface/controllers/admin/DownloadPefController";
import { OrganizerVerificationController } from "../../interface/controllers/admin/OrganizerVerificationController";
import { UserListController } from "../../interface/controllers/admin/userListController";
import { userRepository } from "../container";
import { organizerProfileRepository, uploadDocumentRepository } from "../organizer/container";



export const  fetchUserUseCase= new FetchUserUseCase(userRepository)
export const usersListController= new UserListController(fetchUserUseCase)
const pdfService= new PdfService()
const downloadPdfUseCase= new DownloadPdfUseCase(pdfService)
export const downloadPdfController= new DownloadPdfController(downloadPdfUseCase)

// organizer verification related//
const organizerVerificationUseCase= new OrganizerVerificationUseCase(organizerProfileRepository,uploadDocumentRepository);
export const organizerVerificationController= new OrganizerVerificationController(organizerVerificationUseCase)
