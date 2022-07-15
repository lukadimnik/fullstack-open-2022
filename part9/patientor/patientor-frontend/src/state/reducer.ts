import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

interface AddEntryPayload {
  patientId: string;
  entry: Entry;
}

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_ENTRY';
      payload: AddEntryPayload;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      const patients = { ...state.patients };
      patients[action.payload.id] = action.payload;

      return {
        ...state,
        patients: {
          ...patients,
        },
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case 'ADD_ENTRY':
      const { patientId, entry } = action.payload;
      const patientsWithUpdatedEntry = state.patients;
      if (!patientsWithUpdatedEntry[patientId]) {
        return state;
      }
      patientsWithUpdatedEntry[patientId].entries.push(entry);
      return {
        ...state,
        ...patientsWithUpdatedEntry,
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient,
  };
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesList,
  };
};

export const addEntry = (payload: AddEntryPayload): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: payload,
  };
};
