import { OrganizerProfileUseCase } from "../../application/organizer/organizerProfileUseCase";
import { OrganizerProfileRepository } from "../../infrastructure/repositories/OrganizerProfileRepository";
import { OrganizerProfileController } from "../../interface/controllers/organizer/profileController";
import { loggerService } from "../container";


const organizerProfileRepository= new OrganizerProfileRepository(loggerService)
const  organizerProfileUseCase = new  OrganizerProfileUseCase(organizerProfileRepository)
export const organizerProfileController = new  OrganizerProfileController(organizerProfileUseCase)