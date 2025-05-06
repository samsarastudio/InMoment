import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto {
  url: string;
  thumbnailUrl: string;
  key: string;
  thumbnailKey: string;
  title?: string;
  description?: string;
  tags?: string[];
  metadata?: {
    width?: number;
    height?: number;
    size?: number;
    format?: string;
    takenAt?: Date;
  };
}

export interface IGallery extends Document {
  title: string;
  description?: string;
  photographer: mongoose.Types.ObjectId;
  client?: mongoose.Types.ObjectId;
  photos: IPhoto[];
  isPublic: boolean;
  password?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const photoSchema = new Schema<IPhoto>({
  url: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  key: { type: String, required: true },
  thumbnailKey: { type: String, required: true },
  title: String,
  description: String,
  tags: [String],
  metadata: {
    width: Number,
    height: Number,
    size: Number,
    format: String,
    takenAt: Date
  }
});

const gallerySchema = new Schema<IGallery>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photos: [photoSchema],
  isPublic: {
    type: Boolean,
    default: false
  },
  password: String,
  expiresAt: Date
}, {
  timestamps: true
});

// Index for faster queries
gallerySchema.index({ photographer: 1, createdAt: -1 });
gallerySchema.index({ client: 1, createdAt: -1 });
gallerySchema.index({ isPublic: 1, createdAt: -1 });

export default mongoose.model<IGallery>('Gallery', gallerySchema); 