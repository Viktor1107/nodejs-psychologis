import {
  addFavoritePsychologist,
  deleteFavoritePsychologist,
  getFavoritePsychologists,
} from '../services/favorites.js';

export const addFavoritePsychologistController = async (req, res) => {
  const { psychologistId } = req.params;
  const user = await addFavoritePsychologist(req.user._id, psychologistId);

  res.json({
    status: 200,
    message: 'Psychologist added to favorites',
    data: user.favorites,
  });
};

export const deleteFavoritePsychologistController = async (req, res) => {
  const { psychologistId } = req.params;
  const user = await deleteFavoritePsychologist(req.user._id, psychologistId);

  res.json({
    status: 200,
    message: 'Psychologist removed from favorites',
    data: user.favorites,
  });
};

export const getFavoritePsychologistsController = async (req, res) => {
  const user = await getFavoritePsychologists(req.user._id);

  res.json({
    status: 200,
    message: 'Favorite psychologists list',
    data: user.favorites,
  });
};
