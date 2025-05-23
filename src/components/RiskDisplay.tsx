
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RiskPrediction } from '../types/medical';
import { Heart, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RiskDisplayProps {
  prediction: RiskPrediction | null;
  isLoading: boolean;
}

const RiskDisplay: React.FC<RiskDisplayProps> = ({ prediction, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing patient data...</p>
          <p className="text-sm text-gray-500 mt-2">Processing cardiovascular risk factors</p>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Enter patient data to see risk assessment</p>
        <p className="text-sm text-gray-400 mt-2">Our AI model will analyze cardiovascular risk factors</p>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-700 bg-green-100 border-green-300';
      case 'Moderate': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'High': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low': return <CheckCircle className="h-5 w-5" />;
      case 'Moderate': return <AlertTriangle className="h-5 w-5" />;
      case 'High': return <AlertTriangle className="h-5 w-5" />;
      default: return <Heart className="h-5 w-5" />;
    }
  };

  const getFactorIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Score */}
      <Card className={`p-6 border-2 ${getRiskColor(prediction.riskLevel).replace('text-', 'border-').replace('-700', '-200')}`}>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {getRiskIcon(prediction.riskLevel)}
            <h3 className="text-2xl font-bold">Cardiovascular Risk Assessment</h3>
          </div>
          <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getRiskColor(prediction.riskLevel)}`}>
            <span className="text-lg font-semibold">{prediction.riskLevel} Risk</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">{prediction.riskPercentage}%</div>
            <p className="text-gray-600">10-year cardiovascular disease risk</p>
          </div>
          <div className="mt-4">
            <Progress value={prediction.riskPercentage} className="h-3" />
          </div>
        </div>
      </Card>

      {/* Risk Factors */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Risk Factor Analysis
        </h4>
        <div className="space-y-3">
          {prediction.factors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFactorIcon(factor.impact)}
                <div>
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-sm text-gray-600">{factor.description}</div>
                </div>
              </div>
              <Badge variant="outline" className="font-mono">
                {factor.value}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="text-lg font-semibold mb-4 flex items-center text-blue-900">
          <Heart className="h-5 w-5 mr-2" />
          Clinical Recommendations
        </h4>
        <ul className="space-y-2">
          {prediction.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
              <span className="text-blue-800">{recommendation}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default RiskDisplay;
