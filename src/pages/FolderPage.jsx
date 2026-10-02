import { RefreshCw, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EmailList } from '@/components/email';
import { useEmails } from '@/hooks';
import { FOLDER_LABELS } from '@/constants';

/**
 * Generic folder page — reusable for Starred, Sent, Drafts, Trash, Spam, All Mail, Snoozed.
 * Receives `folder` prop from the route.
 */
export function FolderPage({ folder }) {
  const { emails, loading, error, refetch } = useEmails(folder);
  const folderLabel = FOLDER_LABELS[folder] || folder;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
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

          <span className="ml-2 text-sm text-gray-700 font-semibold capitalize">
            {folderLabel}
          </span>
        </div>

        {/* Pagination info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span>
            {emails.length > 0 ? `1–${emails.length} of ${emails.length}` : '0 of 0'}
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

      {/* Email List Component */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <EmailList
          emails={emails}
          isLoading={loading}
          error={error}
          folderName={folder}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
}
