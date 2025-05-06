import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioItem {
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  imageKey: string;
  thumbnailKey: string;
  category: string;
  tags?: string[];
  featured: boolean;
  order: number;
}

export interface IPortfolio extends Document {
  photographer: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  coverImage?: {
    url: string;
    key: string;
  };
  items: IPortfolioItem[];
  categories: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioItemSchema = new Schema<IPortfolioItem>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  imageKey: {
    type: String,
    required: true
  },
  thumbnailKey: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
});

const portfolioSchema = new Schema<IPortfolio>({
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    url: String,
    key: String
  },
  items: [portfolioItemSchema],
  categories: [String],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
portfolioSchema.index({ photographer: 1, createdAt: -1 });
portfolioSchema.index({ isPublic: 1, createdAt: -1 });
portfolioSchema.index({ 'items.category': 1 });
portfolioSchema.index({ 'items.featured': 1 });

export default mongoose.model<IPortfolio>('Portfolio', portfolioSchema); 