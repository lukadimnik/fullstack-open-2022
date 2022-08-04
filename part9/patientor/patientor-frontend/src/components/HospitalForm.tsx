import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'Hospital',
        diagnosisCodes: [],
        discharge: {
          criteria: '',
          date: ''
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
        if (!values.discharge.criteria) {
          errors.type = requiredError;
        }
        if (!values.discharge.date) {
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
            <Field label='Discharge criteria'
              placeholder='Criteria'
              name='discharge.criteria'
              component={TextField}
            />
            <Field label='Discharge date'
              placeholder='Discharge date'
              name='discharge.date'
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

export default HospitalForm;