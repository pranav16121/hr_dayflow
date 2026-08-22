import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export interface NavbarProps {
  onMenuToggle: () => void;
  portalName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, portalName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Helper to determine the current page title based on the path
  const getPageTitle = (pathname: string) => {
    if (pathname.includes('/employee/dashboard')) return 'Dashboard';
    if (pathname.includes('/employee/profile')) return 'Profile';
    if (pathname.includes('/employee/attendance')) return 'Attendance';
    if (pathname.includes('/employee/leave')) return 'Leave';
    if (pathname.includes('/employee/payroll')) return 'Payroll';
    
    if (pathname.includes('/admin/dashboard')) return 'Dashboard';
    if (pathname.includes('/admin/employees')) return 'Employees';
    if (pathname.includes('/admin/attendance')) return 'Attendance';
    if (pathname.includes('/admin/leaves')) return 'Leave Requests';
    if (pathname.includes('/admin/payroll')) return 'Payroll';
    
    if (pathname.includes('/dev/component-showcase')) return 'Showcase';
    if (pathname.includes('/dev/portal-selector')) return 'Portal Selector';
    return 'Dayflow';
  };

  const pageTitle = getPageTitle(location.pathname);

  // Mock data for demo
  const user = {
    name: 'Sriram Prasad',
    title: 'AI Engineer',
    email: 'sriram@dayflow.com',
    avatar: '',
  };

  const mockNotifications = [
    { id: 1, text: 'Leave request approved', time: '2 hours ago' },
    { id: 2, text: 'New payroll slip generated', time: '1 day ago' },
  ];

  return (
    <header className="h-16 border-b border-border bg-surface shadow-subtle px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left Area: Mobile Drawer Toggle Button + Current Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded-button text-text-secondary hover:bg-zinc-50 border border-border cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold tracking-tight text-text-primary">
            {pageTitle}
          </span>
          <span className="hidden sm:inline-block text-[9px] font-semibold text-text-secondary px-2 py-0.5 rounded-full bg-zinc-50 border border-border">
            {portalName}
          </span>
        </div>
      </div>

      {/* Right Area: Bell Notifications + User Profile Action Toggle */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Container */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-zinc-50 transition-colors border border-border cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary-600 ring-2 ring-surface" />
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-surface border border-border rounded-card shadow-dropdown z-50 py-1.5">
                <div className="px-4 py-2 border-b border-border flex justify-between items-center bg-zinc-50/20">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Notifications
                  </span>
                  <span className="text-[10px] text-primary-600 font-medium hover:underline cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-border max-h-60 overflow-y-auto">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className="px-4 py-2.5 hover:bg-zinc-50/50 transition-colors cursor-pointer">
                      <p className="text-xs text-text-primary leading-snug">
                        {n.text}
                      </p>
                      <span className="text-[10px] text-text-muted mt-0.5 block">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Account Trigger (Name + ChevronDown + Avatar) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-zinc-50 border border-transparent transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="User Account Menu"
          >
            <Avatar name={user.name} size="sm" src={user.avatar} />
            <span className="hidden sm:inline-block text-xs font-semibold text-text-primary">
              {user.name}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
          </button>

          {/* User Options Card Menu */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-card shadow-dropdown z-50 py-1.5 animate-fade-in">
                <div className="px-4 py-2.5 border-b border-border bg-zinc-50/20">
                  <p className="text-xs font-bold text-text-primary">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-text-secondary mt-0.5 truncate">
                    {user.title} • {user.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/employee/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-text-secondary hover:bg-zinc-50 hover:text-text-primary transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <User className="h-3.5 w-3.5 text-text-muted" />
                    My Profile
                  </button>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-4 py-2 text-xs text-text-secondary hover:bg-zinc-50 hover:text-text-primary transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5 text-text-muted" />
                    Account Settings
                  </button>
                </div>
                <div className="border-t border-border pt-1 mt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-danger-600 hover:bg-danger-50 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
