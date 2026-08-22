import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none animate-fade-in">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-danger-50 text-danger-600 flex items-center justify-center border border-danger-100/50">
              <AlertCircle className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                Page not found
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                The path you requested could not be resolved or is out of bounds.
              </p>
            </div>

            <div className="pt-2 w-full">
              <Button fullWidth variant="primary" onClick={() => navigate('/login')}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default NotFound;

