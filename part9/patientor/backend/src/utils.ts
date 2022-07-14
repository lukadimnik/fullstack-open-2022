import {
  Gender,
  HealthCheckRating,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewPatientEntry,
  Entry
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  if (!(entry === Object(entry)) || !('type' in entry)) {
    return false;
  }
  const entryCheck = { ...entry } as Entry;
  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(
    entryCheck.type
  );
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (
    !entries ||
    !Array.isArray(entries) ||
    !entries.every((entry) => isEntry(entry))
  ) {
    throw new Error('Incorrect or missing entries field');
  }
  return entries as Entry[];
};

const parseStringField = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
  entries: unknown;
};


interface EntryFields {
  // base entry
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  diagnosisCodes?: unknown;
  // OccupationalHealthcare
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  // Hospital
  discharge?: {
    date: string;
    criteria: string;
  };
  // HealthCheck
  healthCheckRating?: unknown;
}

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
  entries
}: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    entries: parseEntries(entries),
  };
  return newEntry;
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  switch (entry.type) {
    case 'Hospital':
      const newHospitalEntry: NewHospitalEntry = {
        type: entry.type,
        description: parseStringField(entry.description),
        date: parseDate(entry.date),
        specialist: parseStringField(entry.specialist),
        discharge: {
          date: parseDate(entry.discharge?.date),
          criteria: parseStringField(entry.discharge?.criteria)
        }
      };
      return newHospitalEntry;
    case 'HealthCheck':
      const newHealthCheckEntry: NewHealthCheckEntry = {
        type: entry.type,
        description: parseStringField(entry.description),
        date: parseDate(entry.date),
        specialist: parseStringField(entry.specialist),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      return newHealthCheckEntry;
    case 'OccupationalHealthcare':
      const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        type: entry.type,
        description: parseStringField(entry.description),
        date: parseDate(entry.date),
        specialist: parseStringField(entry.specialist),
        employerName: parseStringField(entry.employerName),
      };
      return newOccupationalHealthcareEntry;
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
      );
  }
};
