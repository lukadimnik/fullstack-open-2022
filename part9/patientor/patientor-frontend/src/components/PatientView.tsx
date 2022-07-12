import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updatePatient, useStateValue } from '../state';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientView = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients }, dispatch] = useStateValue();

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
    return patient.entries.map((entry, i) => {
      return <div key={i}>
        <p>{entry.date}: {entry.description}</p>
        <ul>
          {entry?.diagnosisCodes && entry.diagnosisCodes.map((code, i) => <li key={i}>
            {code}
          </li>)}
        </ul>
      </div>;
    });
  };

  return <>
    <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
    <p>Occupation: {patient.occupation}</p>
    {patient?.ssn && <p>SSN: {patient.ssn}</p>}
    <h3>Entries</h3>
    {patient.entries && renderEntries()}
  </>;
};

export default PatientView;
