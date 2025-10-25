import { ILocation } from "../../valueObject/organizer/location";

export interface EventDisplayEntity{
   _id?: string;
   title: string;
   category: string;
   images: string[];
   location: string;
   attendees: number;
   price: number
}