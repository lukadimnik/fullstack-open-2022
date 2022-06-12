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

console.log(calculateBmi(170, 65));
