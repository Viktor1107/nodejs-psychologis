export const parseSpecialization = (specialization) => {
  if (typeof specialization !== 'string') return null;

  return specialization.trim();
};
