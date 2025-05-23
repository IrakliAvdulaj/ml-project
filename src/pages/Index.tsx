
import React, { useState } from 'react';
import { Heart, Activity, Users, TrendingUp } from 'lucide-react';
import PatientForm from '../components/PatientForm';
import RiskDisplay from '../components/RiskDisplay';
import { PatientData, RiskPrediction } from '../types/medical';

const Index = () => {
  const [prediction, setPrediction] = useState<RiskPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = (newPrediction: RiskPrediction) => {
    setPrediction(newPrediction);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CardioPredict AI</h1>
                <p className="text-gray-600">Cardiovascular Disease Risk Assessment</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-teal-500" />
                <span>Patient-Centered</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Predictive Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Patient Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Information</h2>
              <p className="text-gray-600">Enter patient data to assess cardiovascular disease risk</p>
            </div>
            <PatientForm 
              onPrediction={handlePrediction} 
              onLoading={handleLoading}
            />
          </div>

          {/* Risk Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk Assessment</h2>
              <p className="text-gray-600">AI-powered cardiovascular risk prediction</p>
            </div>
            <RiskDisplay prediction={prediction} isLoading={isLoading} />
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">Advanced Analytics</h3>
            </div>
            <p className="text-blue-700">Our ML model analyzes multiple risk factors to provide accurate cardiovascular disease predictions.</p>
          </div>
          
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-teal-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-teal-900">Patient-Centered Care</h3>
            </div>
            <p className="text-teal-700">Evidence-based risk assessment to support clinical decision making and patient care.</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-900">Predictive Insights</h3>
            </div>
            <p className="text-green-700">Early identification of high-risk patients enables proactive intervention and prevention.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
