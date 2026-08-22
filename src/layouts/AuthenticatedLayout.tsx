import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar, type SidebarLink } from '../components/layout/Sidebar';

export interface AuthenticatedLayoutProps {
  links: SidebarLink[];
  portalName: string;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  links,
  portalName,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar Panel - persistent on desktop, overlay drawer on mobile */}
      <Sidebar
        links={links}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        portalName={portalName}
      />

      {/* Right Content Pane - offsets on desktop to leave room for sidebar */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen w-full overflow-hidden">
        <Navbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          portalName={portalName}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
