import { ReportEntity } from "../../../../../domain/entities/common/report/ReportEntity";
import { CreateReportDTO } from "../../../../DTOs/common/report/CreateReportDTO";
import { ReportResponseDTO } from "../../../../DTOs/common/report/ReportResponseDTO";
import { IBaseMapper } from "../../../common/IBaseMapper";

export interface IReportMapper extends IBaseMapper<ReportEntity, CreateReportDTO, ReportResponseDTO>{
   toResponseDTOList(entity: ReportEntity[]): ReportResponseDTO[];
}