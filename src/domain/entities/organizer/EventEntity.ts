import { Types } from "mongoose";
import { EventStatus, EventType } from "../../enums/organizer/events";
import { ILocation } from "../../valueObject/organizer/location";
import { ITicketTier } from "../../valueObject/organizer/ticketTier";
import { IWaitingListEntry } from "../../valueObject/organizer/WaitingListEntry";

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
     public tickets: ITicketTier[];
     public status?: EventStatus;
     public ticketsSold?: number;
     public totalRevenue?: number;
     public saleStartDate?: Date;
     public saleEndDate?: Date;
     public platformCommission?: number;
     public organizerEarnings?: number;
     public featured?: boolean;
     public approved?: boolean;
     public flaggedReason?: string;
     public createdBy?: string;
     public tags?: string[];
     public waitingListEnabled?: boolean;
     public waitingList?: IWaitingListEntry[];
     public isBlocked?: boolean;
     public blockedReason?: string;
     public isDeleted?: boolean;
     public viewsCount?: number;
     public bookmarkCount?: number;
     public sharesCount?: number;
     public reviews?: Types.ObjectId;
     public averageRating?: number;
     public reviewCount?: number;
     public createdAt?: Date;
     public updatedAt?: Date;


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
    images: string[];
    tickets: ITicketTier[];
    status?: EventStatus;
    ticketsSold?: number;
    totalRevenue?: number;
    platformCommission?: number;
    organizerEarnings?: number;
    featured?: boolean;
    approved?: boolean;
    flaggedReason?: string;
    saleStartDate?: Date;
    saleEndDate?: Date;
    createdBy?: string;
    tags?: string[];
    waitingListEnabled?: boolean;
    waitingList?: IWaitingListEntry[];
    isBlocked?: boolean;
    blockedReason?: string;
    isDeleted?: boolean;
    viewsCount?: number;
    bookmarkCount?: number;
    sharesCount?: number;
    reviews?: Types.ObjectId;
    averageRating?: number;
    reviewCount?: number;
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
    this.saleStartDate = props.saleStartDate;
    this.saleEndDate = props.saleEndDate;
    this.images = props.images;
    this.tickets = props.tickets;
    this.status = props.status || EventStatus.Draft;
    this.ticketsSold = props.ticketsSold || 0;
    this.totalRevenue = props.totalRevenue || 0;
    this.platformCommission = props.platformCommission || 0;
    this.organizerEarnings = props.organizerEarnings || 0;
    this.featured = props.featured || false;
    this.approved = props.approved;
    this.flaggedReason = props.flaggedReason || "";
    this.createdBy = props.createdBy;
    this.tags = props.tags || [];
    this.waitingListEnabled = props.waitingListEnabled || false;
    this.waitingList = props.waitingList || [];
    this.isBlocked = props.isBlocked || false;
    this.blockedReason = props.blockedReason || "";
    this.isDeleted = props.isDeleted || false;
    this.viewsCount = props.viewsCount || 0;
    this.bookmarkCount = props.bookmarkCount || 0;
    this.sharesCount = props.sharesCount || 0;
    this.reviews = props.reviews;
    this.averageRating = props.averageRating || 0;
    this.reviewCount = props.reviewCount || 0;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
   }
 
    public getRemainingSeats(): number {
        const soldSeats = this.tickets.reduce((acc, t) => acc+ t.bookedSeats,0);
        return this.totalCapacity - soldSeats;
    }
    public addToWaitingList(entry: IWaitingListEntry) {
       if(!this.waitingList) this.waitingList = [];
       this.waitingList.push(entry); 
    }
    public block(reason: string) {
      this.isBlocked = true;
      this.blockedReason = reason;
    }
  public unblock(){
     this.isBlocked = false;
     this.blockedReason= "";
  }



  }