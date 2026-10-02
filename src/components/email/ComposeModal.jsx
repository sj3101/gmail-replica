import { useState } from 'react';
import { X, Minus, Maximize2, Minimize2, Paperclip, Image, Link, Smile, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { emailApi } from '@/api';
import { toast } from 'react-toastify';

export function ComposeModal({ isOpen, onClose }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!to.trim() && !subject.trim() && !body.trim()) {
      toast.error('Please add a recipient or content before sending');
      return;
    }
    try {
      setIsSending(true);
      await emailApi.sendEmail({ to: to.trim(), subject: subject.trim(), body: body.trim() });
      toast.success('Message sent');
      // Reset & close
      setTo('');
      setSubject('');
      setBody('');
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = async () => {
    if (to.trim() || subject.trim() || body.trim()) {
      try {
        await emailApi.saveDraft({ to: to.trim(), subject: subject.trim(), body: body.trim() });
        toast.info('Draft saved');
      } catch (err) {
        console.error('Failed to save draft', err);
      }
    }
    setTo('');
    setSubject('');
    setBody('');
    setIsMinimized(false);
    setIsMaximized(false);
    onClose();
  };

  const handleDiscard = () => {
    toast.info('Discarded draft');
    setTo('');
    setSubject('');
    setBody('');
    setIsMinimized(false);
    setIsMaximized(false);
    onClose();
  };

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-0 right-8 z-50 w-72 bg-gray-900 text-white px-4 py-2.5 rounded-t-lg shadow-lg flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors select-none"
      >
        <span className="text-sm font-medium truncate">
          {subject || 'New Message'}
        </span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-gray-300 hover:text-white p-1"
            aria-label="Expand compose window"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-white p-1"
            aria-label="Close compose window"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-white rounded-t-xl shadow-2xl border border-gray-300 flex flex-col transition-all duration-200 ${
        isMaximized
          ? 'inset-6 sm:inset-12 max-w-5xl mx-auto my-auto h-[85vh]'
          : 'bottom-0 right-2 sm:right-8 w-full sm:w-[540px] h-[500px]'
      }`}
    >
      {/* Title Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 rounded-t-xl border-b border-gray-200 select-none">
        <span className="text-sm font-semibold text-gray-700">New Message</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
            aria-label={isMaximized ? 'Restore down' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
            aria-label="Save and close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSend} className="flex-1 flex flex-col min-h-0">
        {/* Recipient Input */}
        <div className="flex items-center px-4 py-1.5 border-b border-gray-100">
          <span className="text-xs text-gray-500 w-12 font-medium">To</span>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Recipients"
            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
        </div>

        {/* Subject Input */}
        <div className="flex items-center px-4 py-1.5 border-b border-gray-100">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full text-sm outline-none text-gray-800 placeholder-gray-400 font-medium bg-transparent"
          />
        </div>

        {/* Body TextArea */}
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email..."
            className="w-full h-full resize-none outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent leading-relaxed"
          />
        </div>

        {/* Footer toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={isSending}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full px-5 py-2 text-sm font-medium gap-2 shadow-xs"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Sending...' : 'Send'}
            </Button>
            <button
              type="button"
              className="p-1.5 text-gray-500 hover:text-gray-800 rounded hover:bg-gray-200"
              aria-label="Attach files"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-500 hover:text-gray-800 rounded hover:bg-gray-200"
              aria-label="Insert link"
            >
              <Link className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-500 hover:text-gray-800 rounded hover:bg-gray-200"
              aria-label="Insert emoji"
            >
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-500 hover:text-gray-800 rounded hover:bg-gray-200"
              aria-label="Insert photo"
            >
              <Image className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleDiscard}
            className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-200 transition-colors"
            aria-label="Discard draft"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
