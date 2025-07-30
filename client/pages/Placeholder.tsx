import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
  description: string;
  feature: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, description, feature }) => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Construction className="h-16 w-16 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Coming Soon</h3>
            <p className="text-gray-600">
              The {feature} feature is planned for future development. This will include:
            </p>
            <ul className="text-left mt-4 space-y-2 text-sm text-gray-600">
              <li>• Full {feature.toLowerCase()} functionality</li>
              <li>• Modern, intuitive interface</li>
              <li>• Real-time updates</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Button disabled>
              Request Feature Development
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Continue prompting to have this page implemented with full functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Specific placeholder pages
export const ContestsPage = () => (
  <Placeholder
    title="Contest Management"
    description="Create, manage, and monitor programming contests"
    feature="Contest Management"
  />
);

export const ProblemsPage = () => (
  <Placeholder
    title="Problem Library"
    description="Add, edit, and organize contest problems"
    feature="Problem Management"
  />
);

export const SubmissionsPage = () => (
  <Placeholder
    title="Submission System"
    description="View and judge code submissions"
    feature="Submission Management"
  />
);

export const UsersPage = () => (
  <Placeholder
    title="User Management"
    description="Manage contestants and administrators"
    feature="User Management"
  />
);

export const MySubmissionsPage = () => (
  <Placeholder
    title="My Submissions"
    description="Track your submission history and results"
    feature="Personal Submission History"
  />
);
