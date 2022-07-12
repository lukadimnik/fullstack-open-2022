/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { NewPatientEntry, Patient, PublicPatient } from '../types';

const getPatients = (): Array<PublicPatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
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

export default {
  getPatients,
  addPatients,
  findPatientById,
};
