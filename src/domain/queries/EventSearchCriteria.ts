export interface IEventSearchCriteria {
   search?: string;
   title?: string;
   location?: string;
   category?: string;
   organizer?: string;
   page: number;
   limit: number;
}