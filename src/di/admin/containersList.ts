import { OrganizerVerificationMapper } from "../../application/mapper/organizer/OrganizerVerificationMapper";
import { UserMapper } from "../../application/mapper/user/UserMapper";
import { DownloadPdfUseCase } from "../../application/useCases/admin/downloadPdfUseCase";
import { FetchUserUseCase } from "../../application/useCases/admin/fetchUsersUsecase";
import { OrganizerVerificationUseCase } from "../../application/useCases/admin/organizerVerificationUseCase";
import { UserQueryRepository } from "../../infrastructure/repositories/UserQueryRepository";

import { PdfService } from "../../infrastructure/services/pdfService/pdfService";
import { DownloadPdfController } from "../../interfaceAdapter/controllers/admin/DownloadPdfController";
import { OrganizerVerificationController } from "../../interfaceAdapter/controllers/admin/OrganizerVerificationController";
import { UserListController } from "../../interfaceAdapter/controllers/admin/userListController";
import { userRepository } from "../container";
import { organizerProfileRepository, uploadDocumentRepository } from "../organizer/container";


const userMapper = new UserMapper();
export const  fetchUserUseCase= new FetchUserUseCase(userRepository, userMapper);
export const usersListController= new UserListController(fetchUserUseCase);
const pdfService= new PdfService();
const downloadPdfUseCase= new DownloadPdfUseCase(pdfService);
export const downloadPdfController= new DownloadPdfController(downloadPdfUseCase);
const organizerVerificationMapper = new OrganizerVerificationMapper()


// organizer verification related//
const userQueryRepository= new UserQueryRepository()
const organizerVerificationUseCase= new OrganizerVerificationUseCase(organizerProfileRepository, uploadDocumentRepository, userRepository, userQueryRepository, organizerVerificationMapper, userMapper);
export const organizerVerificationController= new OrganizerVerificationController(organizerVerificationUseCase)
