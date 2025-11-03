import { NextFunction, Response } from "express";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { IAuthenticatedRequest } from "../../interface/IAuthenticatedRequest";
import { CustomError } from "../../errors/errorClass";
import { HttpStatusCode } from "../../interface/enums/HttpStatusCode";



export class  OrganizerVerificationMiddleware {
     constructor(
        private readonly _userRepo : IUserRepository
     ){}

   verify = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
     
         const {user} = req;

         if(!user || user.role !== "organizer") {
             throw new CustomError("Access denied", HttpStatusCode.FORBIDDEN);
         }

         const organizer = await this._userRepo.findUserById(user.id);
         if(!organizer) throw new CustomError("Organizer not found", HttpStatusCode.NOT_FOUND);
      
       if(!organizer.isVerified) throw new CustomError("Organizer not verified", HttpStatusCode.FORBIDDEN)
         
        next();
   }
}