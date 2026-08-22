import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const LeaveRequests: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Leave Requests" 
        description="Approve or decline time-off applications." 
      />

      {/* Section 1: Pending Requests Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent className="py-6 text-center text-text-secondary text-xs">
          [Pending Requests Metrics Placeholder]
        </CardContent>
      </Card>

      {/* Section 2: Leave Request Table Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests Table</CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-text-secondary text-xs">
          [Leave Requests Table Placeholder]
        </CardContent>
      </Card>
    </div>
  );
};
export default LeaveRequests;
