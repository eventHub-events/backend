import mongoose, { Document, Schema } from "mongoose";
import { IPrivileges, privilegesSchema } from "./SubscriptionPrivileges";

export interface ISubscriptionPlans extends Document {
    name : string;
    price: number;
    durationInDays: number;
    description :string;
    privileges : IPrivileges;
    isActive? :boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


const subscriptionPlansSchema =  new Schema<ISubscriptionPlans>({
     name :{
       type :String,
        required: true,
        unique: true
     },
     price: {
       type :Number,
       required: true
     },
    durationInDays : {
       type: Number,
       required :true
    },
   description : {
      type: String,
      required :true
   },
   privileges : {
      type: privilegesSchema
   },
   isActive : {
       type:Boolean,
       default: true
   }
},{timestamps: true})

export const subscriptionPlansModel = mongoose.model<ISubscriptionPlans>("SubscriptionPlans", subscriptionPlansSchema);