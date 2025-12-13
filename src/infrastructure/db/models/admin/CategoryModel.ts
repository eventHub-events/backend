import mongoose, { Document, Schema } from 'mongoose';

export interface ICategoryDocument extends Document {
  name: string;
  description?: string;
  color: string;
  tags: string[];
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    color: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
      set: (tags: string[]) => tags.map(tag => tag.trim().toLowerCase()),
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const categoryModel = mongoose.model<ICategoryDocument>(
  'Category',
  CategorySchema
);
