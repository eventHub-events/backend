import { ReportEntity } from '../../../../domain/entities/common/report/ReportEntity';
import { ReportDbModel } from '../../../../domain/types/CommonDbTypes';
import { IDomainFactory } from '../IDomainFactory';

export interface IReportEntityFactory extends IDomainFactory<
  ReportDbModel,
  ReportEntity
> {}
