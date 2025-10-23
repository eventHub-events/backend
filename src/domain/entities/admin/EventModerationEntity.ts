import { Types } from "mongoose";
import { EventApprovalStatus } from "../../enums/organizer/events";


export class EventModerationEntity {
  public eventId :  Types.ObjectId;
  public eventApprovalStatus: EventApprovalStatus;
  public approved : boolean;
  public approvedAt : Date;
  public approvedBy? : Types.ObjectId;
  public rejectionReason?: string;
  public flaggedReason? : string;
  public flaggedBy?: Types.ObjectId;
  public flaggedAt? : Date;
  public isBlocked? : boolean;
  public blockedAt?: Date;
  public blockedBy? : Types.ObjectId;
  public  id?: Types.ObjectId;
  public moderationHistory?:Array<{
    action : string;
    reason?: string;
    performedBy?: Types.ObjectId;
    performedAt ?:Date
  }>

  constructor(props:{
    eventId: Types.ObjectId,
    eventApprovalStatus: EventApprovalStatus,
    approved: boolean
    approvedAt : Date;
    approvedBy? : Types.ObjectId;
    rejectionReason?: string;
    flaggedReason? : string;
    flaggedBy?: Types.ObjectId;
    flaggedAt? : Date;
    isBlocked? : boolean;
    blockedAt?: Date;
    blockedBy? : Types.ObjectId;
    id?: Types.ObjectId;
    moderationHistory?:Array<{
    action : string;
    reason?: string;
    performedBy?: Types.ObjectId;
    performedAt? :Date
  }>
  }){
      this.eventId = props.eventId;
      this.eventApprovalStatus = props.eventApprovalStatus;
      this.approved = props.approved;
      this.approvedAt = props.approvedAt;
      this.approvedBy = props.approvedBy;
      this.rejectionReason = props.rejectionReason;
      this.flaggedReason = props.flaggedReason;
      this.flaggedAt = props.flaggedAt;
      this.flaggedBy = props.flaggedBy;
      this.isBlocked = props.isBlocked;
      this.blockedAt = props.blockedAt;
      this.blockedBy = props.blockedBy;
      this.id = props.id;
      this.moderationHistory= props.moderationHistory
  }
   
blockEvent(blockedBy: Types.ObjectId, reason?: string){
   this.isBlocked = true;
   this.blockedBy = blockedBy;
   this.blockedAt = new Date;
   this.addToHistory("Blocked", reason, blockedBy);

}
private addToHistory(action: string, reason: string| undefined, performedBy: Types.ObjectId): void {
   if(!this.moderationHistory) this.moderationHistory = [];

   this.moderationHistory.push({
    action,
    reason,
    performedBy,
    performedAt : new Date()
   })
}
update(data:Partial<EventModerationEntity>){
    Object.assign(this, data);
   return this
}
unBlockEvent(unBlockedBy: Types.ObjectId): void {
  this.isBlocked = false;
  this.blockedBy = undefined;
  this.blockedAt = undefined;
  this.addToHistory ("unBlocked", undefined, unBlockedBy);
}
approveEvent(approvedBy: Types.ObjectId): void {
  this.eventApprovalStatus = EventApprovalStatus.Approved;
  this.approved = true;
  this.approvedAt = new Date();
  this.approvedBy = approvedBy;
  
  this.addToHistory("APPROVED", undefined, approvedBy);
}
rejectEvent(rejectionReason: string, performedBy: Types.ObjectId): void {
  this.eventApprovalStatus = EventApprovalStatus.Rejected;
  this.approved = false;
  this.rejectionReason = rejectionReason;
  
  this.addToHistory("REJECTED", rejectionReason, performedBy);
}



}