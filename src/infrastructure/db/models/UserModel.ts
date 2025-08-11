import mongoose, { Document, ObjectId, Schema, Types } from 'mongoose';

export interface IUserDocument extends Document {

  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  isBlocked:boolean;
  role: string;
  createdAt?:Date
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  isVerified: { type: Boolean, default: false },
  isBlocked:{type:Boolean,default:false},

  role: { type: String, default: 'user' },
},{timestamps:true});

export default mongoose.model<IUserDocument>('User', UserSchema);
