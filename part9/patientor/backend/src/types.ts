export type gender = 'male' | 'female';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: gender;
  occupation: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
