import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const Leave: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Leave" 
        description="Submit leave requests and check balances." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: Leave Balance */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance</CardTitle>
            </CardHeader>
            <CardContent className="py-8 text-center text-text-secondary text-xs">
              [Leave Balance Placeholder]
            </CardContent>
          </Card>
        </div>

        {/* Section 2: Apply for Leave */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Leave</CardTitle>
            </CardHeader>
            <CardContent className="py-8 text-center text-text-secondary text-xs">
              [Apply for Leave Form Placeholder]
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 3: Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-text-secondary text-xs">
          [Leave Requests Table Placeholder]
        </CardContent>
      </Card>
    </div>
  );
};
