import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import {
  InboxPage,
  FolderPage,
  EmailViewPage,
  SearchPage,
  NotFoundPage,
} from '@/pages';
import { ROUTES, FOLDERS } from '@/constants';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Redirect root to inbox
      {
        index: true,
        element: <Navigate to={ROUTES.INBOX} replace />,
      },

      // Inbox (with category tabs)
      {
        path: 'inbox',
        element: <InboxPage />,
      },

      // Single email view (accessible via both /mail/:emailId and /email/:emailId)
      {
        path: 'mail/:emailId',
        element: <EmailViewPage />,
      },
      {
        path: 'email/:emailId',
        element: <EmailViewPage />,
      },

      // Search results
      {
        path: 'search',
        element: <SearchPage />,
      },

      // Folder routes — each uses FolderPage with different folder prop
      {
        path: 'starred',
        element: <FolderPage folder={FOLDERS.STARRED} />,
      },
      {
        path: 'snoozed',
        element: <FolderPage folder={FOLDERS.SNOOZED} />,
      },
      {
        path: 'sent',
        element: <FolderPage folder={FOLDERS.SENT} />,
      },
      {
        path: 'drafts',
        element: <FolderPage folder={FOLDERS.DRAFTS} />,
      },
      {
        path: 'all-mail',
        element: <FolderPage folder={FOLDERS.ALL_MAIL} />,
      },
      {
        path: 'spam',
        element: <FolderPage folder={FOLDERS.SPAM} />,
      },
      {
        path: 'trash',
        element: <FolderPage folder={FOLDERS.TRASH} />,
      },

      // Label pages (dynamic)
      {
        path: 'label/:labelName',
        element: <FolderPage folder={FOLDERS.ALL_MAIL} />,
      },

      // Settings (stub)
      {
        path: 'settings',
        element: (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Settings — coming soon</p>
          </div>
        ),
      },

      // 404 catch-all
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
