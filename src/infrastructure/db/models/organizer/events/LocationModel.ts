import { Schema } from "mongoose";
import { ILocation } from "../../../../../domain/valueObject/organizer/location";


export const  locationSchema = new Schema<ILocation>({
  venue: {
      type: String,
      required: true,
      trim: true
    },
  address: {
    type: String,
    required: true,
    trim: true
    },
  city: {
     type: String,
     required: true,
     trim: true
    },
  state: {
     type: String,
     required: true,
     trim: true
   },
  country : {
       type: String,
       required: true,
       trim: true
    },
  coordinates : {
    lat: {type: Number},
    lng: {type: Number}
  }
})