import { ReportActions, ReportStatus, ReportTypes } from "../../../enums/common/report";

export class ReportEntity {
  public reporterId: string;
  public reporterName: string;
  public reporterRole?: string;
  public targetId: string;
  public targetType: ReportTypes;
  public reason: string;
  public description?: string;
  public status: ReportStatus;
  public id?: string;
  public adminNote?: string;
  public createdAt?:Date;
  public updatedAt?:  Date;
  public action?: ReportActions;
  public chatId?: string;

  constructor(
      props:{
          reporterId: string;
          reporterName: string;
          reporterRole?: string;
          targetId: string;
          targetType: ReportTypes;
          reason: string;
          description?: string;
          status: ReportStatus;
          adminNote?: string;
          createdAt?:  Date;
           updatedAt?: Date;
           id?: string;
           action?: ReportActions;
           chatId?:string

      }
  ){
     this.reporterId = props.reporterId;
     this.reporterName = props.reporterName;
     this.reporterRole = props.reporterRole;
     this.targetId  = props.targetId;
     this.reason = props.reason;
     this.targetType = props.targetType;
     this.id = props.id;
     this.description = props.description;
     this.createdAt = props.createdAt;
     this.updatedAt = props.updatedAt;
     this.adminNote = props.adminNote;
     this.status = props.status;
     this.action = props.action;
     this.chatId = props.chatId


  }
  update(data: Partial<ReportEntity>){
    Object.assign(this,data);
  return this;
  }
}