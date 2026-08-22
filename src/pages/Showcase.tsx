import React, { useState } from 'react';
import { Plus, Trash2, Search, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatusBadge, type DayflowStatus } from '../components/ui/StatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Avatar } from '../components/ui/Avatar';
import { LoadingState } from '../components/feedback/LoadingState';
import { EmptyState } from '../components/feedback/EmptyState';
import { ErrorState } from '../components/feedback/ErrorState';

// 1. Typography Component
export const ShowcaseTypography: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="border-b border-zinc-200/50 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Typography</h1>
        <p className="text-xs text-text-muted mt-0.5">Established scale values and hierarchies mapped for titles and tags.</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Page Title (text-2xl font-bold tracking-tight)</p>
            <h1 className="text-2xl font-bold text-text-primary">Dayflow Dashboard</h1>
          </div>
          <hr className="border-zinc-100" />
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Section Title (text-lg font-semibold)</p>
            <h2 className="text-lg font-semibold text-text-primary">Attendance Overview</h2>
          </div>
          <hr className="border-zinc-100" />
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Card Title (text-base font-semibold)</p>
            <h3 className="text-base font-semibold text-text-primary">Leave Application Details</h3>
          </div>
          <hr className="border-zinc-100" />
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Body Text (text-sm text-text-secondary leading-relaxed)</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Employees can submit leave requests here. Once submitted, requests are forwarded to HR Managers for approval. Notifications will keep you updated.
            </p>
          </div>
          <hr className="border-zinc-100" />
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Helper / Muted Text (text-xs text-text-muted)</p>
            <p className="text-xs text-text-muted">Password must be at least 8 characters long and contain numbers.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 2. Buttons Component
export const ShowcaseButtons: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="border-b border-zinc-200/50 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Buttons</h1>
        <p className="text-xs text-text-muted mt-0.5">Multiple design system button variants, sizes, and states.</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h4 className="text-[11px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="success">Success Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div>
            <h4 className="text-[11px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small Size</Button>
              <Button size="md">Medium (Default)</Button>
              <Button size="lg">Large Size</Button>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div>
            <h4 className="text-[11px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">States & Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading State</Button>
              <Button disabled>Disabled Button</Button>
              <Button icon={<Plus className="h-4 w-4" />}>Left Icon</Button>
              <Button variant="outline" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                Right Icon
              </Button>
              <Button variant="danger" icon={<Trash2 className="h-4 w-4" />} size="sm">
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. Forms & Inputs Component
export const ShowcaseForms: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectValue, setSelectValue] = useState('full-time');

  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="border-b border-zinc-200/50 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Forms & Inputs</h1>
        <p className="text-xs text-text-muted mt-0.5">Input text fields, selectors, and multiline textareas.</p>
      </div>

      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-4">
            <Input 
              label="Full Name" 
              placeholder="Enter your name" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="your@email.com" 
              icon={<Mail className="h-4 w-4" />} 
            />
            <Input 
              label="Search Employee" 
              placeholder="Search..." 
              icon={<Search className="h-4 w-4" />} 
              iconPosition="left"
            />
          </div>
          
          <div className="space-y-4">
            <Select 
              label="Employment Type" 
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'full-time', label: 'Full Time Permanent' },
                { value: 'part-time', label: 'Part Time Permanent' },
                { value: 'contract', label: 'Contractor' },
                { value: 'intern', label: 'Intern' },
              ]}
            />

            <Input 
              label="Phone Number" 
              placeholder="10 digit number" 
              error="Phone number is invalid." 
            />

            <Input 
              label="Personal Link" 
              placeholder="github.com" 
              helperText="Optional portfolio URL address" 
              disabled 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Textarea 
              label="Reason for Leave" 
              placeholder="Describe your reasoning here..." 
              rows={3} 
              helperText="Maximum 500 words allowed."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Badges & Statuses Component
export const ShowcaseBadges: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="border-b border-zinc-200/50 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Badges, Avatars & Statuses</h1>
        <p className="text-xs text-text-muted mt-0.5">Avatars with initials fallback, badges, and status pills.</p>
      </div>

      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Avatars */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Avatars (Image & Fallbacks)</h4>
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center gap-1">
                <Avatar name="Sriram Prasad" size="sm" />
                <span className="text-[10px] text-text-muted">sm</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Avatar name="John Doe" size="md" />
                <span className="text-[10px] text-text-muted">md</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Avatar name="Jane Smith" size="lg" />
                <span className="text-[10px] text-text-muted">lg</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Avatar name="Sriram HR" size="xl" />
                <span className="text-[10px] text-text-muted">xl</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Semantic Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider pt-2">Dayflow HR Status Badges</h4>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-text-muted w-24">Attendance:</span>
                <StatusBadge status="present" />
                <StatusBadge status="absent" />
                <StatusBadge status="half_day" />
                <StatusBadge status="leave" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-text-muted w-24">Leave Requests:</span>
                <StatusBadge status="pending" />
                <StatusBadge status="approved" />
                <StatusBadge status="rejected" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 5. Tables & Modals Component
export const ShowcaseTables: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockEmployees = [
    { id: 'DF-001', name: 'Sriram Prasad', role: 'AI Engineer', type: 'Full-time', status: 'present' as DayflowStatus, leaveBalance: '18 days' },
    { id: 'DF-002', name: 'John Doe', role: 'Frontend Developer', type: 'Full-time', status: 'half_day' as DayflowStatus, leaveBalance: '12 days' },
    { id: 'DF-003', name: 'Jane Smith', role: 'HR Manager', type: 'Full-time', status: 'leave' as DayflowStatus, leaveBalance: '24 days' },
    { id: 'DF-004', name: 'Alex Johnson', role: 'Product Designer', type: 'Contractor', status: 'absent' as DayflowStatus, leaveBalance: '5 days' },
  ];

  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="border-b border-zinc-200/50 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Tables & Modals</h1>
          <p className="text-xs text-text-muted mt-0.5">Responsive listings grid layouts and overlay popup modals.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Open Mock Modal
        </Button>
      </div>

      {/* Grid: Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Leave Balance</TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEmployees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="font-semibold text-xs text-text-muted pl-6">{emp.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar name={emp.name} size="sm" />
                  <span className="font-medium text-text-primary">{emp.name}</span>
                </div>
              </TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>
                <Badge variant="outline">{emp.type}</Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={emp.status} />
              </TableCell>
              <TableCell>{emp.leaveBalance}</TableCell>
              <TableCell className="text-right pr-6">
                <Button variant="ghost" size="sm" onClick={() => alert(`View mock logs of ${emp.name}.`)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal Integration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Review Leave Application"
        description="Application submitted by Sriram Prasad on 22nd Aug 2026."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={() => { setIsModalOpen(false); alert('Leave rejected.'); }}>
              Reject
            </Button>
            <Button variant="success" onClick={() => { setIsModalOpen(false); alert('Leave approved.'); }}>
              Approve
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider block">Leave Type</span>
              <span className="text-xs font-semibold text-text-primary block mt-0.5">Annual Paid Leave</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider block">Duration</span>
              <span className="text-xs font-semibold text-text-primary block mt-0.5">3 Days (25th - 28th Aug)</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider block">Reason</span>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed bg-zinc-50 border border-border p-2.5 rounded-button">
              Traveling out of town for a family reunion event. Will be available on Slack occasionally if needed.
            </p>
          </div>
          <Input label="HR Admin Review Notes" placeholder="Add comments here before final action..." />
        </div>
      </Modal>
    </div>
  );
};

// 6. Feedback States Component
export const ShowcaseFeedback: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="border-b border-zinc-200/50 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Feedback Panels</h1>
        <p className="text-xs text-text-muted mt-0.5">Standardized empty states, load animations, and reload alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-3 bg-zinc-50/30">
            <CardTitle className="text-xs text-text-muted">Loading View</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center">
            <LoadingState message="Loading employee files..." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 bg-zinc-50/30">
            <CardTitle className="text-xs text-text-muted">Empty View</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center p-3">
            <EmptyState 
              title="No leave requests found" 
              description="There are no applications waiting in this folder." 
              actionLabel="Create Request"
              onAction={() => alert('Add Request Clicked.')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 bg-zinc-50/30">
            <CardTitle className="text-xs text-text-muted">Error View</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center p-3">
            <ErrorState 
              title="Unable to load attendance" 
              message="Please check your local network connection and try reloading the page." 
              onRetry={() => alert('Retrying fetch...')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
