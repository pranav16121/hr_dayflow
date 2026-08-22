import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export interface SidebarLink {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarProps {
  links: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
  portalName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  links,
  isOpen,
  onClose,
  portalName,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-[1px] md:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation Panel (Dark Theme: bg-[#111827]) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#111827] border-r border-zinc-800 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Branding & Title */}
        <div>
          <div className="h-16 px-6 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-base font-extrabold tracking-tight text-white select-none">
              DAYFLOW
            </span>
            <span className="sm:hidden text-[9px] font-semibold text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 select-none">
              {portalName}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 select-none">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-button text-sm font-medium transition-all duration-200 cursor-pointer border border-transparent ${
                      isActive
                        ? 'bg-[#1F2937] text-white font-semibold'
                        : 'text-zinc-400 hover:bg-[#1F2937] hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4.5 w-4.5 text-current" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Sign Out Action */}
        <div className="p-4 border-t border-zinc-800 select-none">
          <button
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-button text-sm font-medium text-zinc-400 hover:bg-[#1F2937] hover:text-white transition-colors border border-transparent cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 text-current" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
