import { Request, Response } from "express";
import { IOrganizerVerificationUseCase } from "../../../application/interface/useCases/admin/IOrganizerVerificationUseCase";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";
import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../domain/DTOs/admin/OrganizerOverallVerificationDTO";
import { ZodError } from "zod";

export class OrganizerVerificationController {
  constructor(
    private _organizerVerificationUseCase: IOrganizerVerificationUseCase
  ) {}

  async fetchOrganizerVerificationDetails(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { organizerId } = req.params;
      console.log("id is",organizerId)
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
      const organizerVerificationDetails =
        await this._organizerVerificationUseCase.getOrganizerVerificationDetails(
          organizerId
        );
      return res
        .status(HttpStatusCode.Ok)
        .json(
          ApiResponse.success(
            "Organizer Verification  details fetched successfully",
            HttpStatusCode.Ok,
            organizerVerificationDetails
          )
        );
    } catch (error: unknown) {
      const err = HandleErrorUtility.handleError(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(ApiResponse.error(err, HttpStatusCode.InternalServerError));
    }
  }
  async fetchPendingOrganizers(req: Request, res: Response): Promise<Response> {
    try {
      const pendingUsers =
        await this._organizerVerificationUseCase.getPendingOrganizers();
      return res
        .status(HttpStatusCode.Ok)
        .json(
          ApiResponse.success(
            "Pending organizers fetched successfully",
            HttpStatusCode.Ok,
            pendingUsers
          )
        );
    } catch (err: unknown) {
      const error = HandleErrorUtility.handleError(err);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(ApiResponse.error(error, HttpStatusCode.InternalServerError));
    }
  }
  async fetchPendingOrganizersWithProfile(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const usersWithProfile =
        await this._organizerVerificationUseCase.getPendingOrganizersWithProfile();

      return res
        .status(HttpStatusCode.Ok)
        .json(
          ApiResponse.success(
            "Pending organizers with profile fetched successfully",
            HttpStatusCode.Ok,
            usersWithProfile
          )
        );
    } catch (err) {
      const error = HandleErrorUtility.handleError(err);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(ApiResponse.error(error, HttpStatusCode.InternalServerError));
    }
  }
  async updateOrganizerUploadDocumentStatus(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { organizerId, data } = req.body;
      console.log("rrrr", req.body);
      if (!organizerId || !data) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json(
            ApiResponse.error(
              "organizerId  and update details are required",
              HttpStatusCode.BadRequest
            )
          );
      }
      const updatedDocs =
        await this._organizerVerificationUseCase.updateDocumentStatus(
          organizerId,
          data
        );
      return res
        .status(HttpStatusCode.Ok)
        .json(
          ApiResponse.success(
            "documents updated successfully",
            HttpStatusCode.Ok,
            updatedDocs
          )
        );
    } catch (err) {
      const error = HandleErrorUtility.handleError(err);
      console.log("eeeeeeeee", error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(ApiResponse.error(error, HttpStatusCode.InternalServerError));
    }
  }
  async updateOverallVerificationStatus(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { organizerId } =req.params;
      if (!organizerId) {
        return res
        .status(HttpStatusCode.BadRequest)
        .json(
          ApiResponse.error(
            "OrganizerId is required",
            HttpStatusCode.BadRequest
          )
        );
      }
      const dto=UpdateOrganizerOverallVerificationStatusDTO.create(req.body);
      const result= await this._organizerVerificationUseCase.updateOverallVerificationStatus(organizerId,dto)
      return res.status(HttpStatusCode.Ok).json(ApiResponse.success("Organizer overall verification status updated successfully",HttpStatusCode.Ok,result))
    } catch (err: unknown) {
      if (err instanceof ZodError) {
      return res
        .status(HttpStatusCode.BadRequest)
        .json(
          ApiResponse.error(
            "Invalid request data",
            HttpStatusCode.BadRequest,
            
          )
        );
    }
        const error = HandleErrorUtility.handleError(err);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(ApiResponse.error(error, HttpStatusCode.InternalServerError));
    }
    }
  }

