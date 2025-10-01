import { DownloadPdfUseCase } from "../../application/admin/downloadPdfUseCase";
import { FetchUserUseCase } from "../../application/admin/fetchUsersUsecase";
import { OrganizerVerificationUseCase } from "../../application/admin/organizerVerificationUseCase";
import { UserQueryRepository } from "../../infrastructure/repositories/UserQueryRepository";

import { PdfService } from "../../infrastructure/services/pdfService/pdfService";
import { DownloadPdfController } from "../../interfaceAdapter/controllers/admin/DownloadPefController";
import { OrganizerVerificationController } from "../../interfaceAdapter/controllers/admin/OrganizerVerificationController";
import { UserListController } from "../../interfaceAdapter/controllers/admin/userListController";
import { userRepository } from "../container";
import { organizerProfileRepository, uploadDocumentRepository } from "../organizer/container";



export const  fetchUserUseCase= new FetchUserUseCase(userRepository)
export const usersListController= new UserListController(fetchUserUseCase)
const pdfService= new PdfService()
const downloadPdfUseCase= new DownloadPdfUseCase(pdfService)
export const downloadPdfController= new DownloadPdfController(downloadPdfUseCase)

// organizer verification related//
const userQueryRepository= new UserQueryRepository()
const organizerVerificationUseCase= new OrganizerVerificationUseCase(organizerProfileRepository,uploadDocumentRepository,userRepository,userQueryRepository);
export const organizerVerificationController= new OrganizerVerificationController(organizerVerificationUseCase)
