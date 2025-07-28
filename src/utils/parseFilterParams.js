export const parseSpecialization = (query) => {
  const { specialization } = query;
  if (typeof specialization !== 'string') return null;

  return specialization.trim();
};
