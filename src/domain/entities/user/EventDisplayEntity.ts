

export interface EventDisplayEntity{
   _id?: string;
   title: string;
   category: string;
   images: string[];
   location: string;
   startDate: string;
   tags?: string[];
   attendees?: number;
   price: number;
   description?: string;
   organizer?: string;
   ticketsLeft?:number;
   availability?:number;


}