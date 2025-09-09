import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
  reviewer: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
});

const psychologistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    license: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    initial_consultation: {
      type: String,
    },
    about: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'psychologist',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const psychologistCollection = model(
  'psychologist',
  psychologistSchema,
  'psychologist',
);
