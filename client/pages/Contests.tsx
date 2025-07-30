import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Users,
  FileText,
  Clock,
  Trophy,
  Play,
  Pause,
  Square,
} from 'lucide-react';

interface Contest {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'draft' | 'active' | 'finished' | 'upcoming';
  participants: number;
  problems: number;
  duration: number; // in minutes
}

const mockContests: Contest[] = [
  {
    id: '1',
    name: 'IOI 2024 Practice Round',
    description: 'Practice round for IOI 2024 contestants to familiarize with the system.',
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T15:00:00Z',
    status: 'active',
    participants: 47,
    problems: 4,
    duration: 300,
  },
  {
    id: '2',
    name: 'Regional Qualifier',
    description: 'Regional qualifying round for national team selection.',
    startTime: '2024-01-20T09:00:00Z',
    endTime: '2024-01-20T14:00:00Z',
    status: 'upcoming',
    participants: 23,
    problems: 3,
    duration: 300,
  },
  {
    id: '3',
    name: 'Algorithm Sprint',
    description: 'Short algorithmic problem solving session.',
    startTime: '2024-01-10T14:00:00Z',
    endTime: '2024-01-10T16:00:00Z',
    status: 'finished',
    participants: 89,
    problems: 5,
    duration: 120,
  },
];

const ContestForm = ({ contest, onSave, onCancel }: {
  contest?: Contest;
  onSave: (contest: Partial<Contest>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: contest?.name || '',
    description: contest?.description || '',
    startTime: contest?.startTime?.split('T')[0] || '',
    startTimeHour: contest?.startTime?.split('T')[1]?.substring(0, 5) || '10:00',
    duration: contest?.duration?.toString() || '300',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = `${formData.startTime}T${formData.startTimeHour}:00Z`;
    const endDateTime = new Date(new Date(startDateTime).getTime() + parseInt(formData.duration) * 60000).toISOString();
    
    onSave({
      ...contest,
      name: formData.name,
      description: formData.description,
      startTime: startDateTime,
      endTime: endDateTime,
      duration: parseInt(formData.duration),
      status: contest?.status || 'draft',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Contest Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter contest name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the contest"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTimeHour}
            onChange={(e) => setFormData({ ...formData, startTimeHour: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
            <SelectItem value="180">3 hours</SelectItem>
            <SelectItem value="240">4 hours</SelectItem>
            <SelectItem value="300">5 hours</SelectItem>
            <SelectItem value="360">6 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {contest ? 'Update Contest' : 'Create Contest'}
        </Button>
      </div>
    </form>
  );
};

const getStatusIcon = (status: Contest['status']) => {
  switch (status) {
    case 'active':
      return <Play className="h-4 w-4 text-green-500" />;
    case 'upcoming':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'finished':
      return <Square className="h-4 w-4 text-gray-500" />;
    default:
      return <Pause className="h-4 w-4 text-yellow-500" />;
  }
};

const getStatusColor = (status: Contest['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'finished':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

export default function Contests() {
  const { user } = useAuth();
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);

  const handleCreateContest = (newContest: Partial<Contest>) => {
    const contest: Contest = {
      id: Date.now().toString(),
      participants: 0,
      problems: 0,
      ...newContest as Contest,
    };
    setContests([contest, ...contests]);
    setIsCreateDialogOpen(false);
  };

  const handleEditContest = (updatedContest: Partial<Contest>) => {
    setContests(contests.map(c => 
      c.id === editingContest?.id ? { ...c, ...updatedContest } : c
    ));
    setEditingContest(null);
  };

  const handleDeleteContest = (id: string) => {
    setContests(contests.filter(c => c.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  };

  if (user?.role !== 'admin') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Contests</h1>
          <p className="text-gray-600 mt-2">Participate in programming contests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.filter(c => c.status !== 'draft').map((contest) => (
            <Card key={contest.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{contest.name}</CardTitle>
                  <Badge className={getStatusColor(contest.status)}>
                    {contest.status}
                  </Badge>
                </div>
                <CardDescription>{contest.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Start
                    </span>
                    <span>{formatDate(contest.startTime)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration
                    </span>
                    <span>{formatDuration(contest.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <FileText className="h-4 w-4 mr-1" />
                      Problems
                    </span>
                    <span>{contest.problems}</span>
                  </div>
                  <div className="pt-3">
                    <Button 
                      className="w-full" 
                      disabled={contest.status === 'finished'}
                    >
                      {contest.status === 'active' ? 'Enter Contest' : 
                       contest.status === 'upcoming' ? 'Register' : 'View Results'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contest Management</h1>
          <p className="text-gray-600 mt-2">Create and manage programming contests</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Contest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Contest</DialogTitle>
              <DialogDescription>
                Set up a new programming contest for participants
              </DialogDescription>
            </DialogHeader>
            <ContestForm
              onSave={handleCreateContest}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contests</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Play className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contests.filter(c => c.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contests.filter(c => c.status === 'upcoming').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contests.reduce((sum, c) => sum + c.participants, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Contests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contests</CardTitle>
          <CardDescription>Manage your programming contests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Problems</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contests.map((contest) => (
                <TableRow key={contest.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contest.name}</div>
                      <div className="text-sm text-gray-500">{contest.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contest.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(contest.status)}
                        <span>{contest.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(contest.startTime)}</TableCell>
                  <TableCell>{formatDuration(contest.duration)}</TableCell>
                  <TableCell>{contest.participants}</TableCell>
                  <TableCell>{contest.problems}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingContest(contest)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteContest(contest.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingContest} onOpenChange={() => setEditingContest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contest</DialogTitle>
            <DialogDescription>
              Update contest details and settings
            </DialogDescription>
          </DialogHeader>
          {editingContest && (
            <ContestForm
              contest={editingContest}
              onSave={handleEditContest}
              onCancel={() => setEditingContest(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
