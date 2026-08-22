import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Shield, BellRing, Check } from 'lucide-react';
import { toast } from 'sonner';

export const Settings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(false);
    toast.success('Password changed successfully.');
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      <PageHeader 
        title="Account Settings" 
        description="Manage your account preferences and settings." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Account Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Account Information */}
          <Card>
            <CardHeader className="border-b border-zinc-100 pb-3 flex flex-row items-center gap-2">
              <User className="h-4.5 w-4.5 text-primary-600" />
              <CardTitle className="text-sm font-bold text-text-primary">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Full Name</span>
                  <span className="text-xs font-semibold text-text-primary block mt-1">Sriram Prasad</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Email Address</span>
                  <span className="text-xs font-semibold text-text-primary block mt-1">sriram@dayflow.com</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Job Role</span>
                  <span className="text-xs font-semibold text-text-primary block mt-1">AI Engineer</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Preferences Toggles */}
          <Card>
            <CardHeader className="border-b border-zinc-100 pb-3 flex flex-row items-center gap-2">
              <BellRing className="h-4.5 w-4.5 text-primary-600" />
              <CardTitle className="text-sm font-bold text-text-primary">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-5">
              <div className="space-y-4">
                {/* Email Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="email-notifications-toggle" className="text-xs font-bold text-text-primary block">
                      Email Notifications
                    </label>
                    <span className="text-[10px] text-text-secondary block mt-0.5">
                      Receive daily summaries, payroll reports, and shift updates.
                    </span>
                  </div>
                  <button
                    id="email-notifications-toggle"
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      emailNotifications ? 'bg-primary-600' : 'bg-zinc-200'
                    }`}
                    role="switch"
                    aria-checked={emailNotifications}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out ${
                        emailNotifications ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Push Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="push-notifications-toggle" className="text-xs font-bold text-text-primary block">
                      Push Notifications
                    </label>
                    <span className="text-[10px] text-text-secondary block mt-0.5">
                      Receive real-time notifications on check-in alerts and leave approvals.
                    </span>
                  </div>
                  <button
                    id="push-notifications-toggle"
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      pushNotifications ? 'bg-primary-600' : 'bg-zinc-200'
                    }`}
                    role="switch"
                    aria-checked={pushNotifications}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out ${
                        pushNotifications ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button 
                  size="sm" 
                  variant="primary" 
                  onClick={handleSavePreferences}
                  icon={<Check className="h-3.5 w-3.5" />}
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Security Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-zinc-100 pb-3 flex flex-row items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-primary-600" />
              <CardTitle className="text-sm font-bold text-text-primary">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="text-center py-2 space-y-2">
                <p className="text-xs text-text-secondary">
                  Update your security credentials and account password.
                </p>
              </div>
              
              {!isChangingPassword ? (
                <Button 
                  fullWidth 
                  variant="outline" 
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change Password
                </Button>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary uppercase block">
                      New Password
                    </label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full text-xs px-3 py-2 border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-surface text-text-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary uppercase block">
                      Confirm Password
                    </label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full text-xs px-3 py-2 border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-surface text-text-primary"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button 
                      size="sm"
                      variant="primary" 
                      type="submit"
                      className="flex-1"
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm"
                      variant="ghost" 
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Settings;
