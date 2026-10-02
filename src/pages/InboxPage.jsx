import { useState } from 'react';
import { RefreshCw, MoreVertical, ChevronLeft, ChevronRight, Inbox, Users, Tag, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EmailList } from '@/components/email';
import { useEmails } from '@/hooks';
import { FOLDERS, INBOX_TABS } from '@/constants';
import { cn } from '@/lib/utils';

const CATEGORY_TABS = [
  { id: INBOX_TABS.PRIMARY, label: 'Primary', icon: Inbox },
  { id: INBOX_TABS.PROMOTIONS, label: 'Promotions', icon: Tag },
  { id: INBOX_TABS.SOCIAL, label: 'Social', icon: Users },
  { id: INBOX_TABS.UPDATES, label: 'Updates', icon: AlertCircle },
  { id: INBOX_TABS.FORUMS, label: 'Forums', icon: MessageSquare },
];

export function InboxPage() {
  const [activeTab, setActiveTab] = useState(INBOX_TABS.PRIMARY);
  const { emails, loading, error, refetch } = useEmails(FOLDERS.INBOX);

  const filteredEmails = emails.filter((e) => e.category === activeTab);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={refetch} aria-label="Refresh">
                <RefreshCw className="h-4 w-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More options">
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>More</TooltipContent>
          </Tooltip>
        </div>

        {/* Pagination info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span>
            {filteredEmails.length > 0 ? `1–${filteredEmails.length} of ${filteredEmails.length}` : '0 of 0'}
          </span>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled aria-label="Previous page">
              <ChevronLeft className="h-4 w-4 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled aria-label="Next page">
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-2 overflow-x-auto select-none">
        {CATEGORY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const tabCount = emails.filter((e) => e.category === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap min-w-[160px] justify-start group',
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/40'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              )}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700')} />
              <span>{tab.label}</span>
              {tabCount > 0 && (
                <span
                  className={cn(
                    'ml-auto text-xs px-2 py-0.5 rounded-full font-semibold',
                    isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {tabCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Email List Component */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <EmailList
          emails={filteredEmails}
          isLoading={loading}
          error={error}
          folderName="inbox"
          onRefresh={refetch}
        />
      </div>
    </div>
  );
}
