
import { PatientData, RiskPrediction, RiskFactor } from '../types/medical';

// Simplified logistic regression model for cardiovascular disease prediction
// Based on established risk factors and clinical guidelines
export const predictCardiovascularRisk = (patientData: PatientData): RiskPrediction => {
  console.log('Processing patient data:', patientData);
  
  // Calculate BMI
  const bmi = patientData.weight / Math.pow(patientData.height / 100, 2);
  
  // Initialize risk score
  let riskScore = 0;
  
  // Age factor (significant contributor)
  if (patientData.age >= 65) riskScore += 0.25;
  else if (patientData.age >= 55) riskScore += 0.15;
  else if (patientData.age >= 45) riskScore += 0.08;
  else if (patientData.age >= 35) riskScore += 0.03;
  
  // Gender factor
  if (patientData.gender === 'male' && patientData.age >= 45) riskScore += 0.1;
  if (patientData.gender === 'female' && patientData.age >= 55) riskScore += 0.08;
  
  // Blood pressure factor
  const systolicRisk = Math.max(0, (patientData.systolicBP - 120) / 160);
  const diastolicRisk = Math.max(0, (patientData.diastolicBP - 80) / 100);
  riskScore += Math.max(systolicRisk, diastolicRisk) * 0.2;
  
  // Cholesterol factor
  if (patientData.cholesterol >= 240) riskScore += 0.15;
  else if (patientData.cholesterol >= 200) riskScore += 0.08;
  
  // Glucose factor (diabetes risk)
  if (patientData.glucose >= 126) riskScore += 0.12;
  else if (patientData.glucose >= 100) riskScore += 0.05;
  
  // BMI factor
  if (bmi >= 30) riskScore += 0.1;
  else if (bmi >= 25) riskScore += 0.05;
  
  // Lifestyle factors
  if (patientData.smoking) riskScore += 0.15;
  if (patientData.alcohol) riskScore += 0.05;
  if (!patientData.physicalActivity) riskScore += 0.08;
  if (patientData.familyHistory) riskScore += 0.1;
  
  // Cap the risk score at 1.0
  riskScore = Math.min(riskScore, 1.0);
  
  // Determine risk level
  let riskLevel: 'Low' | 'Moderate' | 'High';
  if (riskScore < 0.1) riskLevel = 'Low';
  else if (riskScore < 0.2) riskLevel = 'Moderate';
  else riskLevel = 'High';
  
  // Convert to percentage
  const riskPercentage = Math.round(riskScore * 100);
  
  console.log('Calculated risk score:', riskScore, 'Risk level:', riskLevel);
  
  // Generate risk factors analysis
  const factors: RiskFactor[] = [
    {
      name: 'Age',
      value: `${patientData.age} years`,
      impact: patientData.age >= 45 ? 'negative' : 'neutral',
      description: patientData.age >= 65 ? 'Advanced age significantly increases risk' : 
                   patientData.age >= 45 ? 'Age is a moderate risk factor' : 'Age is not a significant risk factor'
    },
    {
      name: 'Blood Pressure',
      value: `${patientData.systolicBP}/${patientData.diastolicBP} mmHg`,
      impact: patientData.systolicBP >= 140 || patientData.diastolicBP >= 90 ? 'negative' : 
              patientData.systolicBP >= 120 || patientData.diastolicBP >= 80 ? 'negative' : 'positive',
      description: patientData.systolicBP >= 140 || patientData.diastolicBP >= 90 ? 'Hypertensive - significant risk factor' :
                   patientData.systolicBP >= 120 || patientData.diastolicBP >= 80 ? 'Elevated blood pressure' : 'Normal blood pressure'
    },
    {
      name: 'Cholesterol',
      value: `${patientData.cholesterol} mg/dL`,
      impact: patientData.cholesterol >= 240 ? 'negative' : 
              patientData.cholesterol >= 200 ? 'negative' : 'positive',
      description: patientData.cholesterol >= 240 ? 'High cholesterol - major risk factor' :
                   patientData.cholesterol >= 200 ? 'Borderline high cholesterol' : 'Optimal cholesterol level'
    },
    {
      name: 'BMI',
      value: bmi.toFixed(1),
      impact: bmi >= 30 ? 'negative' : bmi >= 25 ? 'negative' : 'positive',
      description: bmi >= 30 ? 'Obese - increased cardiovascular risk' :
                   bmi >= 25 ? 'Overweight - moderate risk factor' : 'Healthy weight range'
    },
    {
      name: 'Smoking Status',
      value: patientData.smoking ? 'Current smoker' : 'Non-smoker',
      impact: patientData.smoking ? 'negative' : 'positive',
      description: patientData.smoking ? 'Smoking significantly increases cardiovascular risk' : 'Non-smoking status reduces risk'
    },
    {
      name: 'Physical Activity',
      value: patientData.physicalActivity ? 'Active' : 'Sedentary',
      impact: patientData.physicalActivity ? 'positive' : 'negative',
      description: patientData.physicalActivity ? 'Regular exercise reduces cardiovascular risk' : 'Sedentary lifestyle increases risk'
    }
  ];
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (patientData.smoking) {
    recommendations.push('Smoking cessation counseling and support programs are strongly recommended');
  }
  
  if (patientData.systolicBP >= 140 || patientData.diastolicBP >= 90) {
    recommendations.push('Blood pressure management with lifestyle modifications and/or medication');
  }
  
  if (patientData.cholesterol >= 200) {
    recommendations.push('Lipid management through diet, exercise, and possible statin therapy');
  }
  
  if (bmi >= 25) {
    recommendations.push('Weight management through caloric restriction and increased physical activity');
  }
  
  if (!patientData.physicalActivity) {
    recommendations.push('Initiate regular aerobic exercise program (150 minutes moderate intensity per week)');
  }
  
  if (patientData.glucose >= 100) {
    recommendations.push('Blood glucose monitoring and diabetes management if indicated');
  }
  
  recommendations.push('Regular follow-up appointments for cardiovascular risk monitoring');
  recommendations.push('Consider aspirin therapy if indicated and no contraindications');
  
  if (riskLevel === 'High') {
    recommendations.push('Cardiology consultation for comprehensive risk stratification');
  }
  
  return {
    riskScore,
    riskLevel,
    riskPercentage,
    factors,
    recommendations
  };
};

// Additional utility functions for risk calculation
export const calculateFraminghamRisk = (patientData: PatientData): number => {
  // Simplified Framingham Risk Score implementation
  let points = 0;
  
  // Age points
  if (patientData.gender === 'male') {
    if (patientData.age >= 70) points += 11;
    else if (patientData.age >= 65) points += 10;
    else if (patientData.age >= 60) points += 8;
    else if (patientData.age >= 55) points += 6;
    else if (patientData.age >= 50) points += 4;
    else if (patientData.age >= 45) points += 2;
    else if (patientData.age >= 40) points += 1;
  } else {
    if (patientData.age >= 70) points += 12;
    else if (patientData.age >= 65) points += 11;
    else if (patientData.age >= 60) points += 9;
    else if (patientData.age >= 55) points += 7;
    else if (patientData.age >= 50) points += 5;
    else if (patientData.age >= 45) points += 3;
    else if (patientData.age >= 40) points += 1;
  }
  
  // Total cholesterol points
  if (patientData.cholesterol >= 280) points += 3;
  else if (patientData.cholesterol >= 240) points += 2;
  else if (patientData.cholesterol >= 200) points += 1;
  
  // Smoking points
  if (patientData.smoking) {
    points += patientData.gender === 'male' ? 4 : 3;
  }
  
  // Convert points to risk percentage (simplified)
  const riskPercentage = Math.min(Math.max(points * 2, 1), 30);
  
  return riskPercentage / 100;
};
