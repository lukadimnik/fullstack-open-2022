interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([0, 0, 2, 0, 0, 3, 1], 2));
