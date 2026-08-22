import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const Payroll: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Payroll" 
        description="Calculate and run salary cycles." 
      />

      {/* Section 1: Payroll Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-text-secondary text-xs">
          [Payroll Summary Metrics Placeholder]
        </CardContent>
      </Card>

      {/* Section 2: Employee Payroll Table Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Payroll Roster</CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-text-secondary text-xs">
          [Employee Payroll Table Placeholder]
        </CardContent>
      </Card>
    </div>
  );
};
export default Payroll;
