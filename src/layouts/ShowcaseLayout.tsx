import React from 'react';
import { Type, MousePointerClick, FormInput, Tag, TableProperties, AlertTriangle } from 'lucide-react';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import type { SidebarLink } from '../components/layout/Sidebar';

export const ShowcaseLayout: React.FC = () => {
  const showcaseLinks: SidebarLink[] = [
    {
      to: '/dev/component-showcase/typography',
      label: 'Typography',
      icon: Type,
    },
    {
      to: '/dev/component-showcase/buttons',
      label: 'Buttons',
      icon: MousePointerClick,
    },
    {
      to: '/dev/component-showcase/forms',
      label: 'Forms & Inputs',
      icon: FormInput,
    },
    {
      to: '/dev/component-showcase/badges',
      label: 'Badges & Statuses',
      icon: Tag,
    },
    {
      to: '/dev/component-showcase/tables',
      label: 'Tables & Modals',
      icon: TableProperties,
    },
    {
      to: '/dev/component-showcase/feedback',
      label: 'Feedback States',
      icon: AlertTriangle,
    },
  ];

  return (
    <AuthenticatedLayout
      links={showcaseLinks}
      portalName="Component Showcase"
    />
  );
};
