import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const Attendance: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Attendance" 
        description="Review your daily clock-ins." 
      />

      {/* Section 1: Today's Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-text-secondary text-xs">
          [Today's Attendance Placeholder]
        </CardContent>
      </Card>

      {/* Section 2: Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-text-secondary text-xs">
          [Attendance History Placeholder]
        </CardContent>
      </Card>
    </div>
  );
};
