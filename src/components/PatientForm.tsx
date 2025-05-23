
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { PatientData, RiskPrediction } from '../types/medical';
import { predictCardiovascularRisk } from '../utils/mlModel';
import { Calculator, User, Activity, Heart } from 'lucide-react';

interface PatientFormProps {
  onPrediction: (prediction: RiskPrediction) => void;
  onLoading: (loading: boolean) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPrediction, onLoading }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 45,
    gender: 'male',
    height: 170,
    weight: 70,
    systolicBP: 120,
    diastolicBP: 80,
    cholesterol: 200,
    glucose: 90,
    smoking: false,
    alcohol: false,
    physicalActivity: true,
    familyHistory: false,
  });

  const handleInputChange = (field: keyof PatientData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    
    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const prediction = predictCardiovascularRisk(formData);
    onPrediction(prediction);
    onLoading(false);
  };

  const bmi = (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Basic Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age" className="text-sm font-medium">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              min="18"
              max="100"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Physical Measurements */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-2 mb-4">
          <Calculator className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Physical Measurements</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="height" className="text-sm font-medium">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
              min="100"
              max="250"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
              min="30"
              max="200"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">BMI</Label>
            <div className="mt-1 p-2 bg-white rounded border text-center font-medium">
              {bmi}
            </div>
          </div>
        </div>
      </Card>

      {/* Vital Signs */}
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="h-5 w-5 text-red-600" />
          <h3 className="font-semibold text-red-900">Vital Signs & Lab Values</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="systolic" className="text-sm font-medium">Systolic BP (mmHg)</Label>
            <Input
              id="systolic"
              type="number"
              value={formData.systolicBP}
              onChange={(e) => handleInputChange('systolicBP', parseInt(e.target.value))}
              min="80"
              max="250"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="diastolic" className="text-sm font-medium">Diastolic BP (mmHg)</Label>
            <Input
              id="diastolic"
              type="number"
              value={formData.diastolicBP}
              onChange={(e) => handleInputChange('diastolicBP', parseInt(e.target.value))}
              min="40"
              max="150"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cholesterol" className="text-sm font-medium">Cholesterol (mg/dL)</Label>
            <Input
              id="cholesterol"
              type="number"
              value={formData.cholesterol}
              onChange={(e) => handleInputChange('cholesterol', parseInt(e.target.value))}
              min="100"
              max="400"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="glucose" className="text-sm font-medium">Glucose (mg/dL)</Label>
            <Input
              id="glucose"
              type="number"
              value={formData.glucose}
              onChange={(e) => handleInputChange('glucose', parseInt(e.target.value))}
              min="60"
              max="300"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Lifestyle Factors */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">Lifestyle & Risk Factors</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="smoking"
              checked={formData.smoking}
              onCheckedChange={(checked) => handleInputChange('smoking', checked)}
            />
            <Label htmlFor="smoking" className="text-sm">Current smoker</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="alcohol"
              checked={formData.alcohol}
              onCheckedChange={(checked) => handleInputChange('alcohol', checked)}
            />
            <Label htmlFor="alcohol" className="text-sm">Regular alcohol consumption</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exercise"
              checked={formData.physicalActivity}
              onCheckedChange={(checked) => handleInputChange('physicalActivity', checked)}
            />
            <Label htmlFor="exercise" className="text-sm">Regular physical activity</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="family"
              checked={formData.familyHistory}
              onCheckedChange={(checked) => handleInputChange('familyHistory', checked)}
            />
            <Label htmlFor="family" className="text-sm">Family history of CVD</Label>
          </div>
        </div>
      </Card>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
        <Calculator className="h-5 w-5 mr-2" />
        Calculate Risk Assessment
      </Button>
    </form>
  );
};

export default PatientForm;
