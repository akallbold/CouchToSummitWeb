import { v4 as uuidv4 } from 'uuid';

export const idGenerator = (prefix: string) => {
  return `${prefix}-${uuidv4()}`;
};
