import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

export type EntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const OccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'OccupationalHealthcare',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.employerName) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field label='Date'
              placeholder='Date'
              name='date'
              component={TextField}
            />
            <Field label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field label='Employer Name'
              placeholder='Employer Name'
              name='employerName'
              component={TextField}
            />
            <h4>Optional sick leave data</h4>
            <Field label='Sick leave start date'
              placeholder='Sick leave start date'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field label='Sick leave end date'
              placeholder='Sick leave end date'
              name='sickLeave.endDate'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button color='secondary' variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  style={{ float: 'right' }}
                  type='submit'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;