'use client';

import { type ReactNode, useEffect } from 'react';
import { useSidebar } from '@/hooks';

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const { isMobile, isCollapsed, expandSidebar, collapseSidebar } = useSidebar();

  // Handle window resize
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      collapseSidebar();
    } else if (!isMobile && isCollapsed) {
      expandSidebar();
    }
  }, [isMobile, isCollapsed, expandSidebar, collapseSidebar]);

  return <>{children}</>;
}
