import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addEntry, updatePatient, useStateValue } from '../state';
import { Entry, Patient, EntryFormValues } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryView from './EntryView';
import HealthCheckForm from './HealthCheckForm';
import { apiBaseUrl } from '../constants';
import { Alert } from '@material-ui/lab';
import HospitalForm from './HospitalForm';

const PatientView = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients }, dispatch] = useStateValue();
  const [error, setError] = useState<string>();
  const [formType, setFormType] = useState<string>('');

  if (!id) {
    return <p>Cant parse id</p>;
  }
  const patient = patients[id];

  useEffect(() => {
    if (!patient?.ssn) {
      axios.get<Patient>(`http://localhost:3001/api/patients/${id}`)
        .then((data) => {
          dispatch(updatePatient(data.data));
        }
        )
        .catch((err) => console.log(err));
    }
  }, []);

  if (!patient?.ssn) {
    return <p>Missing ssn</p>;
  }

  const renderEntries = () => {
    return patient.entries.map((entry, i) => <EntryView key={i} entry={entry} />);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addEntry({
        patientId: id,
        entry: newEntry
      }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error?.response?.data || 'Unrecognized axios error');
        setError(String(error?.response?.data) || "Unrecognized axios error");
      } else {
        console.error('Unknown error', error);
        setError('Unknown error');
      }
    }
  };

  const renderForm = () => {
    switch (formType) {
      case 'Hospital':
        return <HospitalForm onCancel={() => console.log('cancel')}
        onSubmit={submitNewEntry}
      />;
      case 'HealthCheck':
        return <HealthCheckForm onCancel={() => console.log('cancel')}
        onSubmit={submitNewEntry}
      />;
      case 'OccupationalHealthcare':
        return <HospitalForm onCancel={() => console.log('cancel')}
        onSubmit={submitNewEntry}
      />;
      default:
        return null;
    }
  };

  return <>
    <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
    <p>Occupation: {patient.occupation}</p>
    {patient?.ssn && <p>SSN: {patient.ssn}</p>}
    <h3>Entries</h3>
    {patient.entries && renderEntries()}
    {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
    <button onClick={() => setFormType('Hospital')}>Hospital</button>
    <button onClick={() => setFormType('HealthCheck')}>Health Check</button>
    <button onClick={() => setFormType('OccupationalHealthcare')}>Occupational Healthcare</button>
    <button onClick={() => setFormType('')}>Close Form</button>
    {renderForm()}
    <br />
  </>;
};

export default PatientView;
