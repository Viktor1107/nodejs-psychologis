import Joi from 'joi';

export const createPsychologistSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  avatar_url: Joi.string().uri().required().messages({
    'any.required': 'Avatar URL is required',
    'string.uri': 'Avatar URL must be a valid URI',
  }),
  experience: Joi.string().required().messages({
    'any.required': 'Experience is required',
    'string.empty': 'Experience cannot be empty',
  }),
  price_per_hour: Joi.number().positive().required().messages({
    'any.required': 'Price per hour is required',
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot exceed 5',
  }),
  license: Joi.string().required().messages({
    'any.required': 'License is required',
    'string.empty': 'License cannot be empty',
  }),
  specialization: Joi.string().required().messages({
    'any.required': 'Specialization is required',
    'string.empty': 'Specialization cannot be empty',
  }),
  initial_consultation: Joi.string().optional().allow('').messages({
    'string.base': 'Initial consultation must be a string',
  }),
  about: Joi.string().required().messages({
    'any.required': 'About is required',
    'string.empty': 'About section cannot be empty',
  }),
  reviews: Joi.array()
    .items(
      Joi.object({
        reviewer: Joi.string().required().messages({
          'any.required': 'Reviewer name is required',
        }),
        rating: Joi.number().min(0).max(5).required().messages({
          'any.required': 'Rating is required',
          'number.min': 'Rating must be at least 0',
          'number.max': 'Rating cannot exceed 5',
        }),
        comment: Joi.string().optional().allow('').messages({
          'string.base': 'Comment must be a string',
        }),
      }),
    )
    .optional(),
});

export const patchPsychologistSchema = Joi.object({
  name: Joi.string().trim().messages({
    'string.empty': 'Name cannot be empty',
  }),
  avatar_url: Joi.string().uri().messages({
    'string.uri': 'Avatar URL must be a valid URI',
  }),
  experience: Joi.string().messages({
    'string.empty': 'Experience cannot be empty',
  }),
  price_per_hour: Joi.number().positive().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot exceed 5',
  }),
  license: Joi.string().messages({
    'string.empty': 'License cannot be empty',
  }),
  specialization: Joi.string().messages({
    'string.empty': 'Specialization cannot be empty',
  }),
  initial_consultation: Joi.string().optional().allow('').messages({
    'string.base': 'Initial consultation must be a string',
  }),
  about: Joi.string().messages({
    'string.empty': 'About section cannot be empty',
  }),
  reviews: Joi.array()
    .items(
      Joi.object({
        reviewer: Joi.string().messages({}),
        rating: Joi.number().min(0).max(5).messages({
          'number.min': 'Rating must be at least 0',
          'number.max': 'Rating cannot exceed 5',
        }),
        comment: Joi.string().optional().allow('').messages({
          'string.base': 'Comment must be a string',
        }),
      }),
    )
    .optional(),
});
