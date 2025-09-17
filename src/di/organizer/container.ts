import { OrganizerUploadDocumentMapper } from "../../application/mapper/admin/OrganizerUploadDocumentMapper";
import { GeneratePresignedUrlUseCase } from "../../application/organizer/generatePresignedUrlUseCase";
import { OrganizerAccountSecurityUseCase } from "../../application/organizer/organizerAccountsecurityUseCase";
import { OrganizerProfileUseCase } from "../../application/organizer/organizerProfileUseCase";
import { UploadDocumentUseCase } from "../../application/organizer/uploadDocumentUseCase";
import { OrganizerProfileRepository } from "../../infrastructure/repositories/OrganizerProfileRepository";
import { UploadDocumentRepository } from "../../infrastructure/repositories/UploadDocumentRepository";
import { S3Service } from "../../infrastructure/services/S3Service/S3Service";
import { DocumentController } from "../../interface/controllers/organizer/documentController";
import { OrganizerAccountSecurityController } from "../../interface/controllers/organizer/organizerAccoutSecurityController";
import { OrganizerProfileController } from "../../interface/controllers/organizer/profileController";
import { hashService, loggerService, userRepository } from "../container";


export const organizerProfileRepository= new OrganizerProfileRepository(loggerService)
const  organizerProfileUseCase = new  OrganizerProfileUseCase(organizerProfileRepository)
export const organizerProfileController = new  OrganizerProfileController(organizerProfileUseCase)

const s3Service= new S3Service();
const generatePresignedUrlUseCase = new GeneratePresignedUrlUseCase(s3Service);
const organizerUploadDocumentMapper= new OrganizerUploadDocumentMapper()
export const uploadDocumentRepository=new UploadDocumentRepository(loggerService,organizerUploadDocumentMapper)
const  uploadDocumentUseCase   = new UploadDocumentUseCase(uploadDocumentRepository)
export const documentController= new DocumentController(generatePresignedUrlUseCase,uploadDocumentUseCase)

 const organizerAccountSecurityUseCase = new OrganizerAccountSecurityUseCase(userRepository,hashService)
 export const  organizerAccountSecurityController = new OrganizerAccountSecurityController(organizerAccountSecurityUseCase)



