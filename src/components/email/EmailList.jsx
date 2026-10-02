import { useState } from 'react';
import { EmailListItem } from './EmailListItem';
import {
  Mail,
  Inbox,
  AlertCircle,
  RefreshCw,
  Archive,
  AlertOctagon,
  Trash2,
  MailOpen,
  Star,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { emailApi } from '@/api';
import { toast } from 'react-toastify';

/**
 * Empty folder state visual component with Gmail-style illustration / iconography
 */
function EmptyFolderState({ folderName }) {
  const titles = {
    inbox: 'Your inbox is empty',
    starred: 'No starred messages',
    snoozed: 'No snoozed messages',
    sent: 'No sent messages',
    drafts: 'No saved drafts',
    important: 'No important messages',
    spam: 'Hooray! No spam here',
    trash: 'No messages in Trash',
    'all-mail': 'No messages found',
  };

  const descriptions = {
    inbox: 'Enjoy your clean inbox! New emails will appear here.',
    starred: 'Star messages and conversations to easily find them later.',
    snoozed: 'Snoozed emails will reappear here at their scheduled time.',
    sent: 'Messages you send will show up here.',
    drafts: 'Saved drafts will appear here.',
    important: 'Important messages will be displayed here.',
    spam: 'Spam messages older than 30 days will be automatically deleted.',
    trash: 'Messages in Trash will be deleted automatically after 30 days.',
    'all-mail': 'All your conversations will be listed here.',
  };

  const title = titles[folderName?.toLowerCase()] || `No emails in ${folderName}`;
  const desc = descriptions[folderName?.toLowerCase()] || 'There are no emails to show right now.';

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-500">
        <Inbox className="h-12 w-12 text-blue-500/80" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{desc}</p>
    </div>
  );
}

/**
 * Reusable EmailList container component that renders list of email items, 
 * handles bulk selection state, loading states, and empty states.
 */
export function EmailList({ emails = [], isLoading = false, error = null, folderName = 'inbox', onRefresh }) {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleToggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(emails.map((e) => e.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const getSelectedList = () => Array.from(selectedIds);

  const handleBulkArchive = async () => {
    const ids = getSelectedList();
    if (!ids.length) return;
    await emailApi.archive(ids);
    toast.success(`${ids.length} conversation${ids.length > 1 ? 's' : ''} archived`);
    setSelectedIds(new Set());
  };

  const handleBulkSpam = async () => {
    const ids = getSelectedList();
    if (!ids.length) return;
    await emailApi.markSpam(ids);
    toast.success(`${ids.length} conversation${ids.length > 1 ? 's' : ''} marked as spam`);
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    const ids = getSelectedList();
    if (!ids.length) return;
    if (folderName === 'trash') {
      await emailApi.deleteForever(ids);
      toast.success(`${ids.length} email${ids.length > 1 ? 's' : ''} deleted permanently`);
    } else {
      await emailApi.moveToTrash(ids);
      toast.success(`${ids.length} email${ids.length > 1 ? 's' : ''} moved to Trash`);
    }
    setSelectedIds(new Set());
  };

  const handleBulkRestore = async () => {
    const ids = getSelectedList();
    if (!ids.length) return;
    await emailApi.restoreFromTrash(ids);
    toast.success(`${ids.length} email${ids.length > 1 ? 's' : ''} restored to Inbox`);
    setSelectedIds(new Set());
  };

  const handleBulkMarkRead = async (isRead) => {
    const ids = getSelectedList();
    if (!ids.length) return;
    await emailApi.markRead(ids, isRead);
    toast.success(`${ids.length} marked as ${isRead ? 'read' : 'unread'}`);
    setSelectedIds(new Set());
  };

  const handleBulkStar = async (isStarred) => {
    const ids = getSelectedList();
    if (!ids.length) return;
    await emailApi.setStar(ids, isStarred);
    toast.success(`${ids.length} conversation${ids.length > 1 ? 's' : ''} ${isStarred ? 'starred' : 'unstarred'}`);
    setSelectedIds(new Set());
  };

  const allSelected = emails.length > 0 && selectedIds.size === emails.length;
  const partiallySelected = selectedIds.size > 0 && selectedIds.size < emails.length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <RefreshCw className="h-7 w-7 text-blue-500 animate-spin" />
        <span className="text-sm text-gray-500 font-medium">Loading emails...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-sm text-red-600 font-medium">{error}</p>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh} className="mt-2">
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (!emails || emails.length === 0) {
    return <EmptyFolderState folderName={folderName} />;
  }

  return (
    <div className="w-full bg-white flex flex-col min-h-0 flex-1 overflow-hidden">
      {/* List Header toolbar check bar & bulk action buttons */}
      <div className="flex items-center px-3 sm:px-4 py-2 border-b border-gray-200 bg-gray-50/50 text-xs text-gray-500 font-medium select-none min-h-[41px]">
        <label className="flex items-center gap-2 cursor-pointer mr-2">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = partiallySelected;
            }}
            onChange={handleSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            aria-label="Select all emails"
          />
          <span className="hidden sm:inline font-normal text-gray-700">Select All</span>
        </label>

        {selectedIds.size > 0 ? (
          <div className="flex items-center gap-1 sm:gap-2 ml-2 border-l border-gray-200 pl-3">
            <span className="text-blue-700 font-semibold mr-2 text-xs">
              {selectedIds.size} selected
            </span>

            {/* Archive button (not relevant if already in trash) */}
            {folderName !== 'trash' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBulkArchive} aria-label="Archive">
                    <Archive className="h-4 w-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Archive</TooltipContent>
              </Tooltip>
            )}

            {/* Spam button */}
            {folderName !== 'trash' && folderName !== 'spam' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBulkSpam} aria-label="Report spam">
                    <AlertOctagon className="h-4 w-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Report spam</TooltipContent>
              </Tooltip>
            )}

            {/* Delete button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600" onClick={handleBulkDelete} aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{folderName === 'trash' ? 'Delete forever' : 'Move to Trash'}</TooltipContent>
            </Tooltip>

            {/* Restore button if in Trash */}
            {folderName === 'trash' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBulkRestore} aria-label="Restore to Inbox">
                    <RotateCcw className="h-4 w-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Restore to Inbox</TooltipContent>
              </Tooltip>
            )}

            {/* Mark read button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleBulkMarkRead(true)} aria-label="Mark as read">
                  <MailOpen className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as read</TooltipContent>
            </Tooltip>

            {/* Mark unread button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleBulkMarkRead(false)} aria-label="Mark as unread">
                  <Mail className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as unread</TooltipContent>
            </Tooltip>

            {/* Star button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleBulkStar(true)} aria-label="Star selected">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Star conversations</TooltipContent>
            </Tooltip>
          </div>
        ) : null}

        <span className="ml-auto text-gray-400">
          {emails.length} {emails.length === 1 ? 'email' : 'emails'}
        </span>
      </div>

      {/* Email rows */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={selectedIds.has(email.id)}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>
    </div>
  );
}
