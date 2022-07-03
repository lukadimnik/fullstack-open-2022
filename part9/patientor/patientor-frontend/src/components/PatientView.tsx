import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
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
    if (!patient.ssn) {
      axios.get<Patient>(`http://localhost:3001/api/patients/${id}`)
        .then((data) => {
          dispatch({ type: "UPDATE_PATIENT", payload: data.data });
        }
        )
        .catch((err) => console.log(err));
    }
  }, []);

  if (!patient?.ssn) {
    return <p>Missing ssn</p>;
  }
  
  return <>
    <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
    <p>Occupation: {patient.occupation}</p>
    <p>SSN: {patient.ssn}</p>
  </>;
};

export default PatientView;
