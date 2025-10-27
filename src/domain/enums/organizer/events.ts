export enum EventStatus {
  Draft = "draft",
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
  Cancelled = "cancelled",
  Flagged = "flagged",
  Blocked ="blocked"
}

export  enum EventType {
  Conference  = 'conference',
  Workshop   = "workshop",
   Sports   = "sports",
   Other  = "other"
}

export enum TicketStatus {
  Active = "Active",
  Inactive = "Inactive"
}
export enum EventVisibility {
   Public = "public",
   Private = "private",
   InviteOnly = "invite-only"

}
export enum EventApprovalStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Flagged = "flagged",
  Blocked = "blocked",
  Unblocked ="unblocked"
}