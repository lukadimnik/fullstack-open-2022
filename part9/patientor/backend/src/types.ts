export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type EntryType = 'Hospital' | 'OccupationalHealthcare' | "HealthCheck";

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  // type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  specialist: string;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
