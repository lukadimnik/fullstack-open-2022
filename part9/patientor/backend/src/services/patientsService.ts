/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import {
  Entry,
  NewEntry,
  HealthCheckEntry,
  NewPatientEntry,
  Patient,
  PublicPatient,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { assertNever } from '../utils';

const getPatients = (): Array<PublicPatient> => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatients = (entry: NewPatientEntry): PublicPatient => {
  const { name, dateOfBirth, gender, occupation, ssn } = entry;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): Patient | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const id: string = uuid();
  switch (entry.type) {
    case 'Hospital':
      const hospitalEntry: HospitalEntry = {
        id,
        ...entry
      };
      patientsData.find((patient) => patient.id === patientId)?.entries.push(hospitalEntry);
      console.log('patientsData', patientsData);
      return hospitalEntry;
    case 'HealthCheck':
      const healthCheckEntry: HealthCheckEntry = {
        id,
        ...entry
      };
      patientsData.find((patient) => patient.id === patientId)?.entries.push(healthCheckEntry);
      console.log('patientsData', patientsData);
      return healthCheckEntry;
    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        id,
        ...entry
      };
      patientsData.find((patient) => patient.id === patientId)?.entries.push(occupationalHealthcareEntry);
      console.log('patientsData', patientsData);
      return occupationalHealthcareEntry;
    default:
        return assertNever(entry);
  }
};

export default {
  getPatients,
  addPatients,
  findPatientById,
  addEntry,
};
