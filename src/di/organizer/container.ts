import { OrganizerUploadDocumentMapper } from "../../application/mapper/admin/OrganizerUploadDocumentMapper";
import { UploadDocumentsMapper } from "../../application/mapper/admin/UploadDocumentsMapper";
import { UserMapper } from "../../application/mapper/user/UserMapper";
import { UsersMapper } from "../../application/mapper/user/usersMapper";
import { GeneratePresignedUrlUseCase } from "../../application/organizer/generatePresignedUrlUseCase";
import { OrganizerAccountSecurityUseCase } from "../../application/organizer/organizerAccountsecurityUseCase";
import { OrganizerProfileUseCase } from "../../application/organizer/organizerProfileUseCase";
import { OrganizerBlankProfileCreationUseCase } from "../../application/organizer/profile/organizerBlankProfileCreationUseCase";
import { UploadDocumentUseCase } from "../../application/organizer/uploadDocumentUseCase";
import { OrganizerProfileEntityFactory } from "../../infrastructure/factories/OrganizerProfileEntityFactory";
import { UploadDocumentFactory } from "../../infrastructure/factories/UploadDocumentFactory";
import { UserEntityFactory } from "../../infrastructure/factories/UserEntityFactory";
import { OrganizerProfileRepository } from "../../infrastructure/repositories/OrganizerProfileRepository";
import { UploadDocumentRepository } from "../../infrastructure/repositories/UploadDocumentRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { WinstonLoggerService } from "../../infrastructure/services/logger/loggerService";
import { S3Service } from "../../infrastructure/services/S3Service/S3Service";
import { DocumentController } from "../../interfaceAdapter/controllers/organizer/documentController";
import { OrganizerAccountSecurityController } from "../../interfaceAdapter/controllers/organizer/organizerAccoutSecurityController";
import { OrganizerProfileController } from "../../interfaceAdapter/controllers/organizer/profileController";
import { hashService } from "../common/commonContainers";


 const loggerService=  new WinstonLoggerService ()
 const userMapper = new UserMapper();
const usersMapper= new UsersMapper(userMapper)
const userEntityFactory = new UserEntityFactory()
const userRepository  = new UserRepository(loggerService,userMapper,usersMapper,userEntityFactory)
const organizerProfileEntityFactory = new OrganizerProfileEntityFactory()
export const organizerProfileRepository= new OrganizerProfileRepository(loggerService, organizerProfileEntityFactory)
const  organizerProfileUseCase = new  OrganizerProfileUseCase(organizerProfileRepository, userRepository)
export const organizerProfileController = new  OrganizerProfileController(organizerProfileUseCase)

const s3Service= new S3Service();
const generatePresignedUrlUseCase = new GeneratePresignedUrlUseCase(s3Service);
const organizerUploadDocumentMapper= new OrganizerUploadDocumentMapper()
const uploadDocumentsMapper        = new UploadDocumentsMapper(organizerUploadDocumentMapper)
const  uploadDocumentFactory       =  new UploadDocumentFactory()
export const uploadDocumentRepository=new UploadDocumentRepository(loggerService,uploadDocumentFactory);
const  uploadDocumentUseCase   = new UploadDocumentUseCase(uploadDocumentRepository, organizerUploadDocumentMapper, uploadDocumentsMapper )
export const documentController= new DocumentController(generatePresignedUrlUseCase,uploadDocumentUseCase)
export const organizerBlankProfileCreationUseCase = new OrganizerBlankProfileCreationUseCase (organizerProfileRepository)


 const organizerAccountSecurityUseCase = new OrganizerAccountSecurityUseCase(userRepository,hashService)
 export const  organizerAccountSecurityController = new OrganizerAccountSecurityController(organizerAccountSecurityUseCase);
 



