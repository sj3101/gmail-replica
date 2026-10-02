import { Link } from 'react-router-dom';
import { formatEmailDate, getInitials, getAvatarColor } from '@/utils';
import { Star, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A single row in the email list — matches Gmail's row layout.
 */
export function EmailRow({ email }) {
  const initials = getInitials(email.from.name);
  const avatarBg = getAvatarColor(email.from.name);

  return (
    <Link
      to={`/mail/${email.id}`}
      className={cn(
        'flex items-center gap-3 px-4 py-2 border-b border-gray-100 cursor-pointer transition-colors group hover:shadow-sm',
        email.isRead ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'
      )}
      aria-label={`Email from ${email.from.name}: ${email.subject}`}
    >
      {/* Sender avatar */}
      <div
        className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
        style={{ backgroundColor: avatarBg }}
        aria-hidden="true"
      >
        {initials}
      </div>

      {/* Sender name */}
      <div
        className={cn(
          'w-40 flex-shrink-0 truncate text-sm',
          email.isRead ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'
        )}
      >
        {email.from.name}
        {email.threadCount > 1 && (
          <span className="ml-1 text-gray-400 font-normal text-xs">
            {email.threadCount}
          </span>
        )}
      </div>

      {/* Subject + snippet */}
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span
          className={cn(
            'text-sm truncate',
            email.isRead ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'
          )}
        >
          {email.subject}
        </span>
        <span className="text-sm text-gray-400 truncate hidden sm:block">
          — {email.snippet}
        </span>
      </div>

      {/* Right meta */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        {email.hasAttachments && (
          <Paperclip className="h-4 w-4 text-gray-400" aria-label="Has attachment" />
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // star toggle — to be wired up later
          }}
          aria-label={email.isStarred ? 'Unstar email' : 'Star email'}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        >
          <Star
            className={cn(
              'h-4 w-4',
              email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        </button>
        <span
          className={cn(
            'text-xs',
            email.isRead ? 'text-gray-500' : 'font-semibold text-gray-800'
          )}
        >
          {formatEmailDate(email.date)}
        </span>
      </div>
    </Link>
  );
}
