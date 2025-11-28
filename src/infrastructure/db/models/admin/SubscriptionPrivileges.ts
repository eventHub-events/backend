import { Schema } from "mongoose";

export interface IPrivileges {
  maxActiveEvents : number;
  maxFeaturedEvents: number;
  payout: {
    frequency: "within-1-week" | "within-2-weeks" | "within-1-month";
    delayDays: number;
  };
  supportLevel : "email"|"priority";
  commissionRate : number;


}

export const privilegesSchema =  new Schema<IPrivileges>({
    maxActiveEvents  : {
      type : Number,
      required: true
     },
     maxFeaturedEvents : {
        type: Number,
        required: true
     },
     payout : {
        frequency : {
           type : String,
           enum :["within-1-week", "within-2-weeks","within-1-week"],
           required: true
         },
       delayDays : {
         type : Number,
         required: true
        }
      },
      supportLevel : {
              type :String,
              enum: ["email" , "priority"]
      },
     commissionRate : {
        type: Number
     },

  


},{_id: false, timestamps: true},)

