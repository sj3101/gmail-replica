import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ComposeModal } from '@/components/email';

/**
 * Root application layout:
 * - Fixed header at top
 * - Collapsible sidebar on left
 * - Main content area (Outlet) on right
 * - Floating Compose modal
 */
export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={500}>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
        {/* Top header */}
        <Header onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />

        {/* Body: sidebar + main content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onCompose={() => setIsComposeOpen(true)}
          />

          {/* Main content area */}
          <main
            id="main-content"
            className="flex-1 overflow-auto bg-white rounded-tl-2xl border-l border-gray-200"
            role="main"
          >
            <Outlet />
          </main>
        </div>

        {/* Compose Modal */}
        <ComposeModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
}
