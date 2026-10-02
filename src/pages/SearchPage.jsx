import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { EmailList } from '@/components/email';
import { useSearch } from '@/hooks';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading, refetch } = useSearch();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header banner */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50/60">
        <div className="flex items-center gap-2 text-gray-700">
          <Search className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">
            {query
              ? `Search results for "${query}"`
              : 'Search emails by sender, subject, or body'}
          </span>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <EmailList
          emails={results}
          isLoading={loading}
          folderName="all-mail"
          onRefresh={refetch}
        />
      </div>
    </div>
  );
}
