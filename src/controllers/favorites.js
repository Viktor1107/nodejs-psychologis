import { psychologistCollection } from '../db/models/psychologists.js';
import {
  addFavoritePsychologist,
  deleteFavoritePsychologist,
  getFavoritePsychologists,
} from '../services/favorites.js';

export const addFavoritePsychologistController = async (req, res) => {
  const { psychologistId } = req.params;
  const user = await addFavoritePsychologist(req.user._id, psychologistId);

  const addedPsychologist = await psychologistCollection.findById(
    psychologistId,
  );

  res.json({
    status: 200,
    message: 'Psychologist added to favorites',
    data: addedPsychologist,
  });
};

export const deleteFavoritePsychologistController = async (req, res) => {
  const { psychologistId } = req.params;
  const user = await deleteFavoritePsychologist(req.user._id, psychologistId);

  res.json({
    status: 200,
    message: 'Psychologist removed from favorites',
  });
};

export const getFavoritePsychologistsController = async (req, res) => {
  const userId = req.user._id;
  const user = await getFavoritePsychologists(userId);

  res.json({
    status: 200,
    message: 'Favorite psychologists list',
    data: user.favorites,
  });
};
