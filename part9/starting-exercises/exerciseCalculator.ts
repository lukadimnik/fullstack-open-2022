interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseTimePerDay: number[];
  target: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numberArgs = args.slice(2).map((arg) => Number(arg));
  const areAllNumbers = numberArgs.every((time) => !isNaN(time));
  if (areAllNumbers) {
    const [target, ...exerciseTimePerDay] = numberArgs;
    return {
      exerciseTimePerDay,
      target,
    };
  }

  throw new Error('Provided values were not numbers!');
};

const calculateExercises = (
  dailyExcHours: number[],
  target: number
): ExerciseResults => {
  const average =
    dailyExcHours.reduce((prev, cur) => prev + cur, 0) / dailyExcHours.length;
  const periodLength = dailyExcHours.length;
  const trainingDays = dailyExcHours.filter((hour) => hour > 0).length;
  const success = average >= target;
  const targetDiff = target - average;

  let rating;
  if (targetDiff <= 0) {
    rating = 1;
  } else if (targetDiff > 0 && targetDiff <= 1) {
    rating = 2;
  } else {
    rating = 3;
  }

  const ratingDescription = {
    1: 'congrats, you reached your goal',
    2: 'not too bad but could be better',
    3: 'far from your goal',
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating],
    target,
    average,
  };
};

try {
  const { exerciseTimePerDay, target } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseTimePerDay, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
