import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Inbox,
  Star,
  Clock,
  Send,
  FileText,
  Trash2,
  AlertOctagon,
  Mail,
  ChevronDown,
  Plus,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES, FOLDERS } from '@/constants';
import { getUnreadCount, subscribeToEmailChanges } from '@/data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const NAV_ITEMS = [
  {
    label: 'Inbox',
    path: ROUTES.INBOX,
    icon: Inbox,
    folder: FOLDERS.INBOX,
  },
  {
    label: 'Starred',
    path: ROUTES.STARRED,
    icon: Star,
    folder: FOLDERS.STARRED,
  },
  {
    label: 'Snoozed',
    path: ROUTES.SNOOZED,
    icon: Clock,
    folder: FOLDERS.SNOOZED,
  },
  {
    label: 'Sent',
    path: ROUTES.SENT,
    icon: Send,
    folder: FOLDERS.SENT,
  },
  {
    label: 'Drafts',
    path: ROUTES.DRAFTS,
    icon: FileText,
    folder: FOLDERS.DRAFTS,
  },
  {
    label: 'All Mail',
    path: ROUTES.ALL_MAIL,
    icon: Mail,
    folder: FOLDERS.ALL_MAIL,
  },
  {
    label: 'Spam',
    path: ROUTES.SPAM,
    icon: AlertOctagon,
    folder: FOLDERS.SPAM,
  },
  {
    label: 'Trash',
    path: ROUTES.TRASH,
    icon: Trash2,
    folder: FOLDERS.TRASH,
  },
];

const USER_LABELS = [
  { label: 'work', color: '#1a73e8' },
  { label: 'finance', color: '#34a853' },
  { label: 'personal', color: '#ea4335' },
  { label: 'shopping', color: '#fbbc04' },
];

function NavItem({ item, isCollapsed }) {
  const unread = item.folder ? getUnreadCount(item.folder) : 0;

  const content = (
    <NavLink
      to={item.path}
      end={item.path === ROUTES.INBOX}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-4 rounded-r-full py-1.5 pl-6 pr-4 text-sm transition-colors duration-150 cursor-pointer select-none group',
          isActive
            ? 'bg-blue-100 text-blue-800 font-semibold'
            : 'text-gray-700 hover:bg-gray-100',
          isCollapsed && 'justify-center pl-0 pr-0 rounded-full mx-2 my-0.5'
        )
      }
      aria-label={item.label}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {unread > 0 && (
            <span className="text-xs font-medium text-gray-600 min-w-[20px] text-right">
              {unread}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          {item.label} {unread > 0 ? `(${unread})` : ''}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export function Sidebar({ isCollapsed, onCompose }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    return subscribeToEmailChanges(() => setTick((t) => t + 1));
  }, []);

  const composeBtn = (
    <Button
      onClick={onCompose}
      className={cn(
        'shadow-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border border-transparent hover:shadow-md transition-all cursor-pointer',
        isCollapsed ? 'h-12 w-12 rounded-2xl p-0 mx-auto flex items-center justify-center' : 'h-14 rounded-2xl px-6 gap-3 text-base'
      )}
      variant="secondary"
      aria-label="Compose new email"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
      </svg>
      {!isCollapsed && <span>Compose</span>}
    </Button>
  );

  return (
    <aside
      className={cn(
        'flex flex-col bg-white transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 select-none border-r border-gray-100',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      aria-label="Sidebar navigation"
    >
      {/* Compose button */}
      <div className={cn('pt-4 pb-2', isCollapsed ? 'px-2 flex justify-center' : 'px-4')}>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>{composeBtn}</TooltipTrigger>
            <TooltipContent side="right">Compose</TooltipContent>
          </Tooltip>
        ) : (
          composeBtn
        )}
      </div>

      <ScrollArea className="flex-1 py-1">
        {/* Main nav */}
        <nav role="navigation" aria-label="Mail folders">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavItem item={item} isCollapsed={isCollapsed} />
              </li>
            ))}
          </ul>
        </nav>

        {!isCollapsed && (
          <>
            <Separator className="my-3" />

            {/* Labels section */}
            <div className="px-6 mb-2">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full group">
                <span className="font-medium">Labels</span>
                <ChevronDown className="h-4 w-4 ml-auto group-hover:text-gray-800" />
              </button>
            </div>

            <ul className="space-y-0.5">
              {USER_LABELS.map((lbl) => (
                <li key={lbl.label}>
                  <NavLink
                    to={`/label/${lbl.label}`}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-4 rounded-r-full py-1 pl-6 pr-4 text-sm cursor-pointer select-none',
                        isActive
                          ? 'bg-blue-100 text-blue-800 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      )
                    }
                  >
                    <Tag className="h-4 w-4" style={{ color: lbl.color }} />
                    <span className="capitalize">{lbl.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="px-6 mt-2">
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Plus className="h-4 w-4" />
                <span>Create new label</span>
              </button>
            </div>
          </>
        )}
      </ScrollArea>
    </aside>
  );
}
