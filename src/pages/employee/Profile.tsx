import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Profile" 
        description="Review and update your profile details." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="py-8 text-center text-text-secondary text-xs">
            [Personal Information Placeholder]
          </CardContent>
        </Card>

        {/* Section 2: Job Information */}
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="py-8 text-center text-text-secondary text-xs">
            [Job Information Placeholder]
          </CardContent>
        </Card>

        {/* Section 3: Salary Information */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Information</CardTitle>
          </CardHeader>
          <CardContent className="py-8 text-center text-text-secondary text-xs">
            [Salary Information Placeholder]
          </CardContent>
        </Card>

        {/* Section 4: Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="py-8 text-center text-text-secondary text-xs">
            [Documents Placeholder]
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
