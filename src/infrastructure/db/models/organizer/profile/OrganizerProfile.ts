  import mongoose, { Document, Schema, Types } from "mongoose";
  // import { IOrganizer } from "../../../../../domain/entities/IOrganizer";
import { IUserMinimal } from "../../../../../domain/types/IUserMinimal";

  export interface IOrganizerProfile extends Document {
    organizerId: Types.ObjectId | IUserMinimal
    location: string;
    organization: string;
    website: string;
    bio: string;
    trustScore: number;
    totalEarnings: number;
    profilePicture: string;
    kycVerified: boolean;
  }

  const organizerProfileSchema = new Schema<IOrganizerProfile>(
    {
      organizerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      location: { type: String },
      organization: { type: String },
      website: { type: String },
      bio: { type: String },
      trustScore: {
        type: Number,
        default: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
      },
      profilePicture: {
        type: String,
      },
      kycVerified: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true, 
    }
  );



  export default mongoose.model<IOrganizerProfile>('OrganizerProfile', organizerProfileSchema);
