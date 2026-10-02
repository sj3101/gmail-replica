import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Archive,
  Trash2,
  AlertOctagon,
  Star,
  Mail,
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Paperclip,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEmail } from '@/hooks';
import { formatEmailDate, getInitials, getAvatarColor } from '@/utils';
import { emailApi } from '@/api';
import { toast } from 'react-toastify';

export function EmailViewPage() {
  const { emailId } = useParams();
  const navigate = useNavigate();
  const { email, loading, error } = useEmail(emailId);

  const handleArchive = async () => {
    if (!emailId) return;
    await emailApi.archive(emailId);
    toast.success('Conversation archived');
    navigate(-1);
  };

  const handleSpam = async () => {
    if (!emailId) return;
    await emailApi.markSpam(emailId);
    toast.success('Marked as spam');
    navigate(-1);
  };

  const handleDelete = async () => {
    if (!emailId) return;
    if (email?.folder === 'trash') {
      await emailApi.deleteForever(emailId);
      toast.success('Email deleted permanently');
    } else {
      await emailApi.moveToTrash(emailId);
      toast.success('Moved to Trash');
    }
    navigate(-1);
  };

  const handleMarkUnread = async () => {
    if (!emailId) return;
    await emailApi.markRead(emailId, false);
    toast.success('Marked as unread');
    navigate(-1);
  };

  const handleToggleStar = async () => {
    if (!emailId) return;
    const res = await emailApi.toggleStar(emailId);
    if (res.isStarred) {
      toast.success('Conversation starred');
    } else {
      toast.info('Conversation unstarred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <span className="animate-pulse font-medium text-sm">Loading email...</span>
      </div>
    );
  }

  if (error || !email) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
        <p className="text-lg font-medium text-gray-700">Email not found</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  const senderInitials = getInitials(email.from.name);
  const senderColor = getAvatarColor(email.from.name);

  return (
    <div className="flex flex-col h-full overflow-auto bg-white">
      {/* Top toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10 select-none">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Back">
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleArchive} aria-label="Archive">
              <Archive className="h-4 w-4 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleSpam} aria-label="Report spam">
              <AlertOctagon className="h-4 w-4 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Report spam</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleDelete} aria-label="Delete">
              <Trash2 className="h-4 w-4 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{email.folder === 'trash' ? 'Delete forever' : 'Move to Trash'}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleMarkUnread} aria-label="Mark as unread">
              <Mail className="h-4 w-4 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark as unread</TooltipContent>
        </Tooltip>

        <div className="ml-auto flex items-center gap-1 text-xs text-gray-500 font-medium">
          <span>1 of {email.threadCount || 1}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled aria-label="Older email">
            <ChevronDown className="h-4 w-4 rotate-90 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled aria-label="Newer email">
            <ChevronDown className="h-4 w-4 -rotate-90 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Email content */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-6">
        {/* Subject */}
        <div className="flex items-start gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-normal text-gray-900 flex-1 leading-snug">
            {email.subject}
          </h1>
          <button
            onClick={handleToggleStar}
            className="p-1 rounded hover:bg-gray-100 transition-colors mt-0.5"
            aria-label={email.isStarred ? 'Unstar email' : 'Star email'}
          >
            <Star
              className={`h-5 w-5 ${
                email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-gray-500'
              }`}
            />
          </button>
          {email.hasAttachments && (
            <Paperclip className="h-5 w-5 text-gray-400 mt-1" aria-label="Has attachments" />
          )}
        </div>

        {/* Email message bubble */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          {/* Message header */}
          <div className="flex items-start gap-4 px-4 sm:px-6 py-4 border-b border-gray-100">
            {/* Sender avatar */}
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 mt-0.5 select-none"
              style={{ backgroundColor: senderColor }}
              aria-hidden="true"
            >
              {senderInitials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{email.from.name}</span>
                <span className="text-xs sm:text-sm text-gray-500">&lt;{email.from.email}&gt;</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-0.5">
                <span>to </span>
                {email.to?.map((r, i) => (
                  <span key={r.email || i}>
                    <span className="text-gray-700">{r.name || r.email}</span>
                    {i < email.to.length - 1 && ', '}
                  </span>
                ))}
              </div>
              {email.cc && email.cc.length > 0 && (
                <div className="text-xs sm:text-sm text-gray-500">
                  <span>cc: </span>
                  {email.cc.map((r, i) => (
                    <span key={r.email || i}>
                      <span className="text-gray-700">{r.name || r.email}</span>
                      {i < email.cc.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-xs text-gray-500 hidden sm:inline">{formatEmailDate(email.date)}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Reply">
                <Reply className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* Message body */}
          <div
            className="px-4 sm:px-6 py-5 prose prose-sm max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />
        </div>

        {/* Reply/Forward actions */}
        <div className="flex items-center gap-3 mt-6">
          <Button variant="outline" className="gap-2">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" className="gap-2 hidden sm:inline-flex">
            <ReplyAll className="h-4 w-4" />
            Reply all
          </Button>
          <Button variant="outline" className="gap-2">
            <Forward className="h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
