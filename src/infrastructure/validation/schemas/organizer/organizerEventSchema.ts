 
 import  {  z } from "zod"
import { EventVisibility } from "../../../../domain/enums/organizer/events"

 const titleRegex = /^[A-Z][A-Za-z0-9 ]{4,29}$/
 const descriptionRegex = /^[A-Z][A-Za-z0-9 ]{14,149}$/
 const addressRegex = /^[A-Z][a-zA-Z, ]{4,49}$/
 const cityRegex = /^[A-Z][A-Za-z ]{4,15}$/
 const pinCodeRegex = /^[0-9]{6}$/
 const tagRegex = /^[A-Za-z]+$/
 const venueRegex =  /^[A-Z][a-zA-Z\s,]{2,}$/
  enum EventMode {
    Online = "online",
    Approved ="offline"
  }


 // -----Location Validation -----//
const locationSchema = z.object({
  venue : z.string()
           .regex(venueRegex,"Venue must contain letters only and first letter should be capital" )
          .min(3,{message:"Venue must be at least 3 characters"}),
  address: z.string()
           .regex(addressRegex,{message: "Address must start with  a capital letter, contain only letters and be 5-50 characters long"}),
 city: z.string()
       . regex(cityRegex, {message:"City must contain letters only  and first letter  should be capital"})
       .min(3,{message:"city must be at least 3 characters"}),
 state: z.string()
        .regex(cityRegex, {message: "State must contain letters only and first letter should be capital"})
        .min(3, "state must be at least 3 characters"),
 country: z.string()
          .regex(cityRegex,"Country must contain letters only and first letter should be capital" )
          .min(3,{message:"Country must be at least 3 characters"}),
 pincode: z.string()
           .regex(pinCodeRegex, {message: "PinCode must contain exactly 6 digits"}).optional(),
  
  latitude: z.number().optional(),
  longitude: z.number().optional(),

})

export const organizerEventSchema = z.object({
   title: z.string()
       .min(5,{message: "Title must be at least 5 characters."})
       .max(30, {message:  "Tile must be at most 30 characters."})
       .regex(titleRegex, {message: "Title must start  with a capital letter and contain only letters, numbers, and spaces."}),
     type: z.enum(Object.values(EventMode) as [string, ...string[]], {
               message: "Event type must be either 'Online' or 'Offline'."
                  }),
    categoryId: z.string().min(1, { message: "Category ID is required" }),
    organizerId: z.string().min(1, { message: "organizer ID is required" }),
   description : z.string()
                .min(20, {message: "Title must be at least 20 characters"})
                .max(150, {message: "Description must be at most 150 characters"})
                .regex(descriptionRegex,{message: "Description must start with a capital letter and contain only letters, numbers"}),
  location: locationSchema,
  totalCapacity: z.coerce
  .number()
  .min(1, { message: "Total capacity shall be at least 1" })
  .max(500, { message: "Total capacity shall not be more than 500" }),
    featured: z.boolean().optional(),
    startDate: z.coerce.date(),
    organizerEmail: z.string().email().optional(),
    visibility: z.enum(Object.values(EventVisibility)as [string,...string[]]),
    images: z.array(z.string()).default([]).optional(),

    endDate: z.coerce.date(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
 tags: z.array(
       z.string()
       .min(1,{message: "Tag cannot be empty"})
       .regex(tagRegex, {message: "Tags can  contain only letters"})
 ).optional()
   

 })

 export type OrganizerEventSchemaType = z.infer<typeof organizerEventSchema>;
 export const organizerEventUpdateSchema     =  organizerEventSchema.partial();