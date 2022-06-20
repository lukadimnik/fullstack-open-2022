import patientsData from '../../data/patients';
import { Patient } from '../types';

const getPatients = (): Array<Patient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = () => {
  return null;
};

export default {
  getPatients,
  addPatients,
};
