import { UnauthorizedError } from "../../../../../domain/errors/common";
import { IReportRepository } from "../../../../../domain/repositories/common/IReportRepository";
import { IBookingRepository } from "../../../../../domain/repositories/user/IBookingRepository";
import { CreateReportDTO } from "../../../../DTOs/common/report/CreateReportDTO";
import { ReportResponseDTO } from "../../../../DTOs/common/report/ReportResponseDTO";
import { IReportMapper } from "../../../../interface/mapper/common/report/IReportMapper";
import { ICreateOrganizerReportUseCase } from "../../../../interface/useCases/common/report/user/ICreateOrganizerReportUseCase";

export class CreateOrganizerReportUseCase implements ICreateOrganizerReportUseCase {
  constructor(
      private _reportRepo : IReportRepository,
      private _reportMapper : IReportMapper,
      private _bookingRepo : IBookingRepository,

  ){}
  async execute(dto: CreateReportDTO): Promise<ReportResponseDTO> {
        const booked = await this._bookingRepo.findBookingsByOrganizerIdAndUserId(dto.targetId,dto.reporterId);
            if(!booked) throw new UnauthorizedError("Your are not eligible to  report this organizer");
      
          const reportEntity = this._reportMapper.toEntity(dto);
          const created = await this._reportRepo.createReport(reportEntity);
      
       return this._reportMapper.toResponseDTO(created);
}
}