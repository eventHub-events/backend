import mongoose, { Document, Schema, Types } from "mongoose";
import UserModel from "./UserModel";
import { Address } from "../../../../domain/valueObject/user/address";



export interface IUserProfileDocument extends Document{
  
  user: Types.ObjectId,
  name: string;
  address: Address;
  memberSince: Date;
  image?: string;
  twoFAEnabled?: boolean;
  favorites?: string [];

}

const AddressSchema = new Schema({
  line1: {
    type: String,
    
  },
  line2: {
     type: String
  },
  city: {
     type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  pin:{
    type: String
  }

})

const UserProfileSchema = new Schema<IUserProfileDocument> ({
 
  user: {
    type: Schema.Types.ObjectId,
    ref : UserModel,
  },
  name : {
    type : String
  },
  address: {
     type : AddressSchema
  },
 
  memberSince: {
    type:Date
  },
  image : {
    type: String
  },

  twoFAEnabled: {
    type: Boolean,
    default : false
  },
  favorites:[
    {
      type: String
    }
  ]


},{timestamps: true})

export default mongoose.model<IUserProfileDocument>("UserProfile", UserProfileSchema);