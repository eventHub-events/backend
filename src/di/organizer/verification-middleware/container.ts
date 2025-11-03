import { OrganizerVerificationMiddleware } from "../../../infrastructure/middleware/verification/checkVerifiedOrganizer";
import { userRepository } from "../../common/commonContainers";


export const organizerVerificationMiddleware = new OrganizerVerificationMiddleware(userRepository);