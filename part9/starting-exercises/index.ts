import express from 'express';
import { calculateBmi } from './bmiCalculator';
import bodyParser from 'body-parser';
import { calculateExercises } from './exerciseCalculator';

const app = express();

interface exerciseRequestBody {
  daily_exercises?: number[];
  target: number;
}
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res
      .send({ error: 'Malformatted or missing parameters' })
      .status(400);
  }

  const bmi = calculateBmi(height, weight);

  return res.status(200).json({
    height,
    weight,
    bmi,
  });
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body as exerciseRequestBody;
  if (
    [target, daily_exercises].includes(undefined) ||
    !Array.isArray(daily_exercises)
  ) {
    return res.send({ error: 'missing parameters' }).status(400);
  }

  const areAllNumbers = daily_exercises
    .concat(target)
    .every((time) => !isNaN(Number(time)));
  if (!areAllNumbers) {
    return res.send({ error: 'malformated parameters' }).status(400);
  }
  const dailyExercises = daily_exercises.map((hours: unknown) => Number(hours));

  const result = calculateExercises(dailyExercises, Number(target));

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('server running on port ' + PORT);
});
