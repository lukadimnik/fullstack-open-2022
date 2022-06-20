import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findPatientById(req.params.id);
  if (patient) {
    return res.send(patient);
  }
  return res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    // const newPatientEntry = toNewPatientEntry(req.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = patientsService.addPatients(req.body);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
