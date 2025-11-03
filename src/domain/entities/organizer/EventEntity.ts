import { Types } from "mongoose";
import { EventApprovalStatus, EventStatus, EventType, EventVisibility } from "../../enums/organizer/events";
import { ILocation } from "../../valueObject/organizer/location";


  export class EventEntity {
     public organizerId: Types.ObjectId;
     public title: string;
     public type: EventType;
     public categoryId: Types.ObjectId;
     public description: string;
     public location: ILocation;
     public totalCapacity: number;
     public startDate: Date;
     public endDate: Date;
     public images: string[];
     public eventId?:  Types.ObjectId;
     public status?: EventStatus;
     public approvedStatus?:EventApprovalStatus;
     public ticketsSold?: number;
     public featured?: boolean;
     public organizerEmail?: string;
     public visibility?:EventVisibility;
     public createdBy?: string;
     public tags?: string[];
     public isDeleted?: boolean;
     public createdAt?: Date;
     public updatedAt?: Date;
     public startTime?: string;
     public endTime?: string;
     public review?: Types.ObjectId;


   constructor(props: {
    organizerId: Types.ObjectId;
    title: string;
    type: EventType;
    categoryId: Types.ObjectId;
    description: string;
    location: ILocation;
    totalCapacity: number;
    startDate: Date;
    endDate: Date;
    approvedStatus?:EventApprovalStatus;
    images: string[];
    eventId?: Types.ObjectId;
    status?: EventStatus;
    startTime?: string;
    endTime?: string;
    ticketsSold?: number;
    featured?: boolean;
    createdBy?: string;
    tags?: string[];
    isDeleted?: boolean;
    organizerEmail?: string;
    visibility?: EventVisibility;
    reviews?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
   }) {
        this.organizerId = props.organizerId
    this.title = props.title;
    this.type = props.type;
    this.categoryId = props.categoryId;
    this.description = props.description;
    this.location = props.location;
    this.totalCapacity = props.totalCapacity;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.images = props.images;
    this.organizerEmail = props.organizerEmail;
    this .visibility = props.visibility;
    this.eventId = props.eventId;
    this.status = props.status || EventStatus.Draft;
    this.ticketsSold = props.ticketsSold || 0;
    this.featured = props.featured || false;
    this.createdBy = props.createdBy;
    this.tags = props.tags || [];
    this.isDeleted = props.isDeleted || false;
    this.startTime = props.startTime,
    this.endTime = props.endTime,
    this.review = props.reviews;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.approvedStatus = props.approvedStatus;
   }
 
  public delete(){
    this.isDeleted = true
  }
public cancel(){
  this.status = EventStatus.Cancelled
}
   updateStatus(status: EventApprovalStatus){
      this.approvedStatus= status;
  
   }
 get currentStatus(): EventStatus {
        if (this.isDeleted) return EventStatus.Cancelled; // Deleted event
        if (!this.approvedStatus || this.approvedStatus === EventApprovalStatus.Pending)
            return EventStatus.Draft;

        const now = new Date();

        if (this.approvedStatus === EventApprovalStatus.Blocked) return EventStatus.Blocked;
        if (this.approvedStatus === EventApprovalStatus.Rejected) return EventStatus.Cancelled;
        if (this.approvedStatus === EventApprovalStatus.Flagged) return EventStatus.Flagged;

        // Timeline based status
        if (this.startDate > now) return EventStatus.Upcoming;
        if (this.startDate <= now && this.endDate >= now) return EventStatus.Active;
        if (this.endDate < now) return EventStatus.Completed;

        return EventStatus.Draft; // Fallback
    }
  }