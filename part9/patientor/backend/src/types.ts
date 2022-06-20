export enum Gender {
  male = 'male',
  female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientWithSsn extends Patient {
  ssn: string;
}

export type NewPatientEntry = Omit<PatientWithSsn, 'id'>;
