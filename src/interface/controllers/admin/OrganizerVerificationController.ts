import { Request, Response } from "express";
import { IOrganizerVerificationUseCase } from "../../../application/interface/admin/IOrganizerVerificationUseCase";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";

export class OrganizerVerificationController {
  constructor(
    private _organizerVerificationUseCase: IOrganizerVerificationUseCase
  ) {}

  async fetchOrganizerVerificationDetails(req: Request, res: Response) {
    try{

      const { organizerId } = req.params;
      if (!organizerId) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json(
            ApiResponse.error(
              "organizerId is required",
              HttpStatusCode.BadRequest
            )
          );
      }
const organizerVerificationDetails=await this._organizerVerificationUseCase.getOrganizerVerificationDetails(organizerId)
res.status(HttpStatusCode.Ok).json(ApiResponse.success("Organizer Verification  details fetched successfully",HttpStatusCode.Ok,organizerVerificationDetails))

    }catch(error:unknown){
       const err=HandleErrorUtility.handleError(error)
      return res.status(HttpStatusCode.InternalServerError).json(ApiResponse.error(err,HttpStatusCode.InternalServerError))
    }

  }
}
