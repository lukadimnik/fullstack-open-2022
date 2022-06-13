interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(process.argv[2]),
      weight: Number(process.argv[3]),
    };
  }

  throw new Error('Provided values were not numbers!');
};

const calculateBmi = (height, weight) => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  }
  if (bmi >= 16 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)';
  }
  if (bmi >= 17 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)';
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (Healthy weight)';
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)';
  }
  if (bmi >= 30 && bmi <= 34.9) {
    return 'Obese (Class I)';
  }
  if (bmi >= 35 && bmi <= 39.9) {
    return 'Obese (Class II)';
  }

  return 'Obese (Class III)';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
