import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, HealthCheckRatingOption, SelectField, TextField, TypeOption } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating } from '../types';

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.CriticalRisk,
        diagnosisCodes: []
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
            <SelectField
              label='Type'
              name='type'
              options={typeOptions}
            />
            <SelectField
              label='HealthCheckRating'
              name='healthCheckRating'
              options={healthCheckRatingOptions}
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

export default AddEntryForm;