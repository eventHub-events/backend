import { ErrorMessages } from "../../../../../constants/errorMessages";
import { BadRequestError } from "../../../../../domain/errors/common";
import { IReportRepository } from "../../../../../domain/repositories/common/IReportRepository";
import { IBookingRepository } from "../../../../../domain/repositories/user/IBookingRepository";
import { CreateReportDTO } from "../../../../DTOs/common/report/CreateReportDTO";
import { ReportResponseDTO } from "../../../../DTOs/common/report/ReportResponseDTO";
import { IReportMapper } from "../../../../interface/mapper/common/report/IReportMapper";
import { ICreateEventReportUseCase } from "../../../../interface/useCases/common/report/user/ICreateEventReportUseCase";


export class CreateEventReportUseCase implements ICreateEventReportUseCase {
  constructor(
      private _reportRepo : IReportRepository,
      private _reportMapper : IReportMapper,
      private _bookingRepo : IBookingRepository
  ){}
async execute(dto: CreateReportDTO): Promise<ReportResponseDTO> {
  
  const booked = await this._bookingRepo.findBookingsByEventIdAndUserId(dto.targetId,dto.reporterId);
  if(!booked) throw new BadRequestError(ErrorMessages.REPORT.NOT_ELIGIBLE_TO_REPORT);

  const reportEntity = this._reportMapper.toEntity(dto);
  
    const created = await this._reportRepo.createReport(reportEntity);

 return this._reportMapper.toResponseDTO(created);
}

}