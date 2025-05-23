
export interface PatientData {
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  systolicBP: number;
  diastolicBP: number;
  cholesterol: number; // mg/dL
  glucose: number; // mg/dL
  smoking: boolean;
  alcohol: boolean;
  physicalActivity: boolean;
  familyHistory: boolean;
}

export interface RiskPrediction {
  riskScore: number; // 0-1 probability
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskPercentage: number;
  factors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  name: string;
  value: string | number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}
