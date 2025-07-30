import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Users,
  FileText,
  Upload,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Code,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for MVP
const mockActiveContests = [
  {
    id: '1',
    name: 'IOI 2024 Practice Round',
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T15:00:00Z',
    status: 'active',
    participants: 47,
    problems: 4,
  },
  {
    id: '2',
    name: 'Regional Qualifier',
    startTime: '2024-01-20T09:00:00Z',
    endTime: '2024-01-20T14:00:00Z',
    status: 'upcoming',
    participants: 23,
    problems: 3,
  },
];

const mockRecentSubmissions = [
  {
    id: '1',
    problem: 'A. Tree Traversal',
    language: 'C++',
    status: 'accepted',
    score: 100,
    time: '2024-01-15T14:30:00Z',
    user: 'contestant1',
  },
  {
    id: '2',
    problem: 'B. Graph Coloring',
    language: 'Python',
    status: 'wrong_answer',
    score: 30,
    time: '2024-01-15T14:25:00Z',
    user: 'contestant2',
  },
  {
    id: '3',
    problem: 'C. Dynamic Programming',
    language: 'C++',
    status: 'time_limit',
    score: 60,
    time: '2024-01-15T14:20:00Z',
    user: 'contestant1',
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage contests, problems, and monitor submissions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 new registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions Today</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+23% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex-col space-y-2">
              <Link to="/contests/new">
                <Calendar className="h-6 w-6" />
                <span>Create Contest</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col space-y-2">
              <Link to="/problems/new">
                <FileText className="h-6 w-6" />
                <span>Add Problem</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col space-y-2">
              <Link to="/users">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Contests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Contests</CardTitle>
            <CardDescription>Currently running and upcoming contests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockActiveContests.map((contest) => (
              <div key={contest.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{contest.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {contest.participants}
                    </span>
                    <span className="flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {contest.problems} problems
                    </span>
                  </div>
                </div>
                <Badge variant={contest.status === 'active' ? 'default' : 'secondary'}>
                  {contest.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest submission activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{submission.problem}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{submission.user}</span>
                    <span>•</span>
                    <span>{submission.language}</span>
                    <span>•</span>
                    <span>{submission.score}%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {submission.status === 'accepted' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {submission.status === 'wrong_answer' && <XCircle className="h-4 w-4 text-red-500" />}
                  {submission.status === 'time_limit' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ContestantDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contestant Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your progress and participate in contests</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solved Problems</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contest Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1450</div>
            <p className="text-xs text-muted-foreground">+75 from last contest</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Active Contest */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Current Contest</span>
          </CardTitle>
          <CardDescription>IOI 2024 Practice Round</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time Remaining</span>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>2h 15m</span>
              </Badge>
            </div>
            <Progress value={45} className="h-2" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button asChild>
                <Link to="/contests/1">
                  <Code className="h-4 w-4 mr-2" />
                  Enter Contest
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/my-submissions">
                  <Upload className="h-4 w-4 mr-2" />
                  My Submissions
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Recent Submissions</CardTitle>
            <CardDescription>Your latest submission attempts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentSubmissions.filter(s => s.user === 'contestant1').map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{submission.problem}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{submission.language}</span>
                    <span>•</span>
                    <span>{submission.score}% score</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {submission.status === 'accepted' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {submission.status === 'time_limit' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Contests</CardTitle>
            <CardDescription>Contests you can participate in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockActiveContests.filter(c => c.status === 'upcoming').map((contest) => (
              <div key={contest.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{contest.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>January 20, 2024</span>
                    <span>•</span>
                    <span>{contest.problems} problems</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Index() {
  const { user } = useAuth();

  if (!user) {
    return null; // This should be handled by ProtectedRoute
  }

  return user.role === 'admin' ? <AdminDashboard /> : <ContestantDashboard />;
}
