import { NewPatientEntry } from './types';

const isString = (text: unknown) => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  const newEntry: NewPatientEntry = {};
  return newEntry;
};
