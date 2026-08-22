import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const Payroll: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Payroll" 
        description="Track your salaries and slips." 
      />

      {/* Section 1: Salary Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Summary</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-text-secondary text-xs">
          [Salary Summary Placeholder]
        </CardContent>
      </Card>

      {/* Section 2: Salary Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-text-secondary text-xs">
          [Salary Breakdown Placeholder]
        </CardContent>
      </Card>
    </div>
  );
};
