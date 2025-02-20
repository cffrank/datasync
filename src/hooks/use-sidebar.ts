import { useCallback, useEffect, useState } from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import { UI_CONFIG } from '@/lib/constants';

export function useSidebar() {
  const { theme, setSidebarCollapsed } = useSettingsStore();
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!theme.sidebarCollapsed);
  }, [theme.sidebarCollapsed, setSidebarCollapsed]);

  const expandSidebar = useCallback(() => {
    setSidebarCollapsed(false);
  }, [setSidebarCollapsed]);

  const collapseSidebar = useCallback(() => {
    setSidebarCollapsed(true);
  }, [setSidebarCollapsed]);

  return {
    isCollapsed: theme.sidebarCollapsed,
    isMobile,
    minWidth: UI_CONFIG.SIDEBAR.MIN_WIDTH,
    maxWidth: UI_CONFIG.SIDEBAR.MAX_WIDTH,
    toggleSidebar,
    expandSidebar,
    collapseSidebar,
  };
}
