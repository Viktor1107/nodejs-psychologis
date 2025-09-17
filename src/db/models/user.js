import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'psychologist' }],
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER],
      default: ROLES.USER,
    },
    photo: {
      url: { type: String, default: null },
      filename: { type: String, default: null },
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
