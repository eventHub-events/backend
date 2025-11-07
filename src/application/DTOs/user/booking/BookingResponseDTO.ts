import { Types } from "mongoose"
import { BookingStatus } from "../../../../domain/enums/user/Booking"

export interface BookingResponseDTO {
       userId : string,
       eventId : string,
       tickets : {
                 name:  string, quantity: number, price: number
                                          }[],
       
         totalAmount : number,
         status: BookingStatus,
         createdAt? : Date ,
         eventTitle: string,
         eventDate: string,
         organizerName: string,
         eventVenue: string,
         userName: string,
         eventImages?: string[],
         id?: string
}