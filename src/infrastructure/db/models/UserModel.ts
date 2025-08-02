import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IUserDocument extends Document {
  _id:ObjectId
  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  role: string;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
});

export default mongoose.model<IUserDocument>('User', UserSchema);
