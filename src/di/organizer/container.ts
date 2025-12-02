import { OrganizerUploadDocumentMapper } from "../../application/mapper/admin/OrganizerUploadDocumentMapper";
import { UploadDocumentsMapper } from "../../application/mapper/admin/UploadDocumentsMapper";

import { GeneratePresignedUrlUseCase } from "../../application/useCases/organizer/generatePresignedUrlUseCase";
import { OrganizerAccountSecurityUseCase } from "../../application/useCases/organizer/organizerAccountsecurityUseCase";
import { OrganizerProfileUseCase } from "../../application/useCases/organizer/organizerProfileUseCase";
import { OrganizerBlankProfileCreationUseCase } from "../../application/useCases/organizer/profile/organizerBlankProfileCreationUseCase";
import { UploadDocumentUseCase } from "../../application/useCases/organizer/uploadDocumentUseCase";
import { VerificationRequestUseCase } from "../../application/useCases/organizer/verification/verificationRequestUseCase";
import { OrganizerProfileEntityFactory } from "../../infrastructure/factories/organizer/OrganizerProfileEntityFactory";
import { UploadDocumentFactory } from "../../infrastructure/factories/organizer/UploadDocumentFactory";
import { UserEntityFactory } from "../../infrastructure/factories/user/UserEntityFactory";
import { OrganizerProfileRepository } from "../../infrastructure/repositories/organizer/OrganizerProfileRepository";
import { UploadDocumentRepository } from "../../infrastructure/repositories/UploadDocumentRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { WinstonLoggerService } from "../../infrastructure/services/logger/loggerService";
import { S3Service } from "../../infrastructure/services/S3Service/S3Service";
import { VerificationEmailTemplate } from "../../infrastructure/services/Templates/verificationEmailTemplate";
import { DocumentController } from "../../interfaceAdapter/controllers/organizer/documentController";
import { OrganizerAccountSecurityController } from "../../interfaceAdapter/controllers/organizer/organizerAccoutSecurityController";
import { OrganizerDocumentVerificationRequestController } from "../../interfaceAdapter/controllers/organizer/organizerDocumentVerificationController";
import { OrganizerProfileController } from "../../interfaceAdapter/controllers/organizer/profileController";
import { emailService, hashService } from "../common/commonContainers";


 const loggerService =  new WinstonLoggerService();
//  const userMapper = new UserMapper();
const userEntityFactory = new UserEntityFactory();
const userRepository  = new UserRepository(loggerService, userEntityFactory);
const organizerProfileEntityFactory = new OrganizerProfileEntityFactory();
export const organizerProfileRepository= new OrganizerProfileRepository(loggerService, organizerProfileEntityFactory);
const  organizerProfileUseCase = new  OrganizerProfileUseCase(organizerProfileRepository, userRepository);
export const organizerProfileController = new  OrganizerProfileController(organizerProfileUseCase);

const s3Service= new S3Service();
const generatePresignedUrlUseCase = new GeneratePresignedUrlUseCase(s3Service);
const organizerUploadDocumentMapper = new OrganizerUploadDocumentMapper();
const uploadDocumentsMapper        = new UploadDocumentsMapper(organizerUploadDocumentMapper);
const  uploadDocumentFactory       = new UploadDocumentFactory();
export const uploadDocumentRepository = new UploadDocumentRepository(loggerService,uploadDocumentFactory);
const  uploadDocumentUseCase   = new UploadDocumentUseCase(uploadDocumentRepository, organizerUploadDocumentMapper, uploadDocumentsMapper, userRepository);
export const documentController= new DocumentController(generatePresignedUrlUseCase,uploadDocumentUseCase);
export const organizerBlankProfileCreationUseCase = new OrganizerBlankProfileCreationUseCase (organizerProfileRepository);

const verificationEmailTemplate  = new VerificationEmailTemplate();
const verificationRequestUseCase = new VerificationRequestUseCase(userRepository, emailService, verificationEmailTemplate);
export const documentVerificationRequestController  = new OrganizerDocumentVerificationRequestController(verificationRequestUseCase);


 const organizerAccountSecurityUseCase = new OrganizerAccountSecurityUseCase(userRepository,hashService);
 export const  organizerAccountSecurityController = new OrganizerAccountSecurityController(organizerAccountSecurityUseCase);
 



