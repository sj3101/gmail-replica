import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-6xl font-bold text-gray-200">404</div>
      <h1 className="text-xl font-medium text-gray-600">Page not found</h1>
      <p className="text-gray-400 text-sm">The page you're looking for doesn't exist.</p>
      <Link
        to={ROUTES.INBOX}
        className="mt-2 text-blue-600 hover:underline text-sm"
      >
        Go back to Inbox
      </Link>
    </div>
  );
}
