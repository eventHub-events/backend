import mongoose from "mongoose";
import { Document,  Schema } from "mongoose";



export interface IOrganizerStripeAccount extends Document  {
  organizerId : mongoose.Types.ObjectId;
  stripeAccountId : string;
  label : string;
  isDefault : boolean;
  onboarded : boolean;
  createdAt : Date;
}

const OrganizerStripeAccountSchema = new Schema({
 organizerId : {
   type : Schema.Types.ObjectId,
   ref : "User",
   required :true
 },
 stripeAccountId : {
   type : String,
   required :true
 },
 label : {
   type : String
 },
 isDefault : {
   type : Boolean,
   default : false
 },
 isActive :{
   type : Boolean,
   default : true
 },
 onboarded : {
   type :Boolean,
   default : false
 }
},{timestamps : true})

export const OrganizerStripeAccountModel =  mongoose.model<IOrganizerStripeAccount>("OrganizerStripeAccount", OrganizerStripeAccountSchema);