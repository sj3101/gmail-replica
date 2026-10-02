import { useNavigate } from 'react-router-dom';
import { formatEmailDate } from '@/utils';
import { Star, Paperclip, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EMAIL_CATEGORIES } from '@/constants';
import { emailApi } from '@/api';
import { toast } from 'react-toastify';

/**
 * Gmail-style Email Row item with check box, star indicator, sender, subject, snippet, timestamp
 */
export function EmailListItem({ email, isSelected, onToggleSelect }) {
  const navigate = useNavigate();

  const handleRowClick = (e) => {
    // If target is checkbox or star button, don't navigate
    if (e.target.closest('.no-nav')) return;
    navigate(`/email/${email.id}`);
  };

  const handleStarClick = async (e) => {
    e.stopPropagation();
    try {
      const res = await emailApi.toggleStar(email.id);
      if (res.isStarred) {
        toast.success('Conversation starred');
      } else {
        toast.info('Conversation unstarred');
      }
    } catch (err) {
      toast.error('Failed to update star');
    }
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(email.id);
    }
  };

  return (
    <div
      onClick={handleRowClick}
      className={cn(
        'group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-100 cursor-pointer transition-all duration-150 select-none relative',
        isSelected
          ? 'bg-blue-50/80 hover:bg-blue-100/70 border-l-4 border-l-blue-600'
          : email.isRead
          ? 'bg-white hover:bg-gray-100/80 hover:shadow-xs'
          : 'bg-[#f2f6fc] hover:bg-[#eaf1fb] hover:shadow-xs'
      )}
      aria-label={`Email from ${email.from.name}: ${email.subject}`}
    >
      {/* Checkbox */}
      <div className="no-nav flex items-center justify-center flex-shrink-0">
        <input
          type="checkbox"
          checked={isSelected || false}
          onChange={handleCheckboxClick}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
          aria-label={`Select email from ${email.from.name}`}
        />
      </div>

      {/* Star */}
      <button
        type="button"
        onClick={handleStarClick}
        aria-label={email.isStarred ? 'Unstar email' : 'Star email'}
        className="no-nav flex-shrink-0 text-gray-400 hover:text-yellow-500 focus:outline-none p-0.5"
      >
        <Star
          className={cn(
            'h-4 w-4 transition-colors',
            email.isStarred
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 hover:text-gray-500'
          )}
        />
      </button>

      {/* Sender name */}
      <div
        className={cn(
          'w-28 sm:w-44 flex-shrink-0 truncate text-sm',
          email.isRead ? 'font-normal text-gray-700' : 'font-bold text-gray-900'
        )}
      >
        {email.from.name}
        {email.threadCount > 1 && (
          <span className="ml-1 text-gray-500 font-normal text-xs">
            ({email.threadCount})
          </span>
        )}
      </div>

      {/* Subject + Snippet */}
      <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
        {email.category && email.category !== EMAIL_CATEGORIES.PRIMARY && (
          <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 capitalize flex-shrink-0">
            <Tag className="h-3 w-3" />
            {email.category}
          </span>
        )}
        <span
          className={cn(
            'text-sm truncate flex-shrink-0 max-w-[200px] sm:max-w-[320px] md:max-w-none',
            email.isRead ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'
          )}
        >
          {email.subject}
        </span>
        <span className="text-sm text-gray-500 truncate hidden sm:inline">
          <span className="mx-1 text-gray-400">-</span>
          {email.snippet}
        </span>
      </div>

      {/* Right side: Attachment + Timestamp */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto pl-2">
        {email.hasAttachments && (
          <Paperclip className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" aria-label="Has attachment" />
        )}
        <span
          className={cn(
            'text-xs whitespace-nowrap',
            email.isRead ? 'text-gray-500 font-normal' : 'text-gray-900 font-bold'
          )}
        >
          {formatEmailDate(email.date)}
        </span>
      </div>
    </div>
  );
}
