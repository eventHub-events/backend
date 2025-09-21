import mongoose, { Document, Schema } from 'mongoose';


export enum KycStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  NotApplicable = "N/A"
}
export interface IUserDocument extends Document {

  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  isBlocked:boolean;
  role: string;
  kycStatus: KycStatus;
  createdAt?:Date;
  isKycResubmitted : boolean ;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  isVerified: { type: Boolean, default: false },
  kycStatus:{type:String,
    enum: Object.values(KycStatus),
    default: KycStatus.NotApplicable},
  isBlocked:{type:Boolean,default:false},
  isKycResubmitted :{
    type : Boolean ,
    default : false
  },

  role: { type: String, default: 'user' },
},{timestamps:true});

export default mongoose.model<IUserDocument>('User', UserSchema);
