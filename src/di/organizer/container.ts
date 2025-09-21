import { OrganizerUploadDocumentMapper } from "../../application/mapper/admin/OrganizerUploadDocumentMapper";
import { UserMapper } from "../../application/mapper/user/UserMapper";
import { UsersMapper } from "../../application/mapper/user/usersMapper";
import { GeneratePresignedUrlUseCase } from "../../application/organizer/generatePresignedUrlUseCase";
import { OrganizerAccountSecurityUseCase } from "../../application/organizer/organizerAccountsecurityUseCase";
import { OrganizerProfileUseCase } from "../../application/organizer/organizerProfileUseCase";
import { OrganizerBlankProfileCreationUseCase } from "../../application/organizer/profile/organizerBlankProfileCreationUseCase";
import { UploadDocumentUseCase } from "../../application/organizer/uploadDocumentUseCase";
import { OrganizerProfileRepository } from "../../infrastructure/repositories/OrganizerProfileRepository";
import { UploadDocumentRepository } from "../../infrastructure/repositories/UploadDocumentRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { WinstonLoggerService } from "../../infrastructure/services/logger/loggerService";
import { S3Service } from "../../infrastructure/services/S3Service/S3Service";
import { DocumentController } from "../../interface/controllers/organizer/documentController";
import { OrganizerAccountSecurityController } from "../../interface/controllers/organizer/organizerAccoutSecurityController";
import { OrganizerProfileController } from "../../interface/controllers/organizer/profileController";
import { hashService } from "../common/commonContainers";
// import { hashService,} from "../container";

 const loggerService=  new WinstonLoggerService ()
 const userMapper = new UserMapper();
const usersMapper= new UsersMapper(userMapper)
const userRepository  = new UserRepository(loggerService,userMapper,usersMapper)
export const organizerProfileRepository= new OrganizerProfileRepository(loggerService)
const  organizerProfileUseCase = new  OrganizerProfileUseCase(organizerProfileRepository, userRepository)
export const organizerProfileController = new  OrganizerProfileController(organizerProfileUseCase)

const s3Service= new S3Service();
const generatePresignedUrlUseCase = new GeneratePresignedUrlUseCase(s3Service);
const organizerUploadDocumentMapper= new OrganizerUploadDocumentMapper()
export const uploadDocumentRepository=new UploadDocumentRepository(loggerService,organizerUploadDocumentMapper);
const  uploadDocumentUseCase   = new UploadDocumentUseCase(uploadDocumentRepository, organizerUploadDocumentMapper )
export const documentController= new DocumentController(generatePresignedUrlUseCase,uploadDocumentUseCase)
export const organizerBlankProfileCreationUseCase = new OrganizerBlankProfileCreationUseCase (organizerProfileRepository)


 const organizerAccountSecurityUseCase = new OrganizerAccountSecurityUseCase(userRepository,hashService)
 export const  organizerAccountSecurityController = new OrganizerAccountSecurityController(organizerAccountSecurityUseCase)



