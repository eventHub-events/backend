import { GeneratePresignedUrlUseCase } from "../../application/organizer/generatePresignedUrlUseCase";
import { OrganizerProfileUseCase } from "../../application/organizer/organizerProfileUseCase";
import { OrganizerProfileRepository } from "../../infrastructure/repositories/OrganizerProfileRepository";
import { S3Service } from "../../infrastructure/services/S3Service/S3Service";
import { DocumentController } from "../../interface/controllers/organizer/documentController";
import { OrganizerProfileController } from "../../interface/controllers/organizer/profileController";
import { loggerService } from "../container";


const organizerProfileRepository= new OrganizerProfileRepository(loggerService)
const  organizerProfileUseCase = new  OrganizerProfileUseCase(organizerProfileRepository)
export const organizerProfileController = new  OrganizerProfileController(organizerProfileUseCase)

const s3Service= new S3Service();
const generatePresignedUrlUseCase = new GeneratePresignedUrlUseCase(s3Service);
export const documentController= new DocumentController(generatePresignedUrlUseCase)


