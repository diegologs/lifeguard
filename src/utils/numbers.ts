export const linearMap = (value, inMin, inMax, outMin, outMax) => {
  value = Math.max(inMin, Math.min(inMax, value));
  const percentage = (value - inMin) / (inMax - inMin);
  return outMin + percentage * (outMax - outMin);
};

export const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
