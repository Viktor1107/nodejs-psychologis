import { UsersCollection } from '../db/models/user.js';

export const addFavoritePsychologist = async (userId, psychologistId) => {
  return await UsersCollection.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: psychologistId } },
    { new: true },
  ).populate('favorites');
};

export const deleteFavoritePsychologist = async (userId, psychologistId) => {
  return await UsersCollection.findByIdAndUpdate(
    userId,
    { $pull: { favorites: psychologistId } },
    { new: true },
  ).populate('favorites');
};

export const getFavoritePsychologists = async (userId) => {
  return await UsersCollection.findById(userId).populate('favorites');
};
