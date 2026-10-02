import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Settings,
  HelpCircle,
  Grid3X3,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getInitials, getAvatarColor } from '@/utils';
import { CURRENT_USER } from '@/data';
import { ROUTES } from '@/constants';

export function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const avatarBg = getAvatarColor(CURRENT_USER.name);
  const initials = getInitials(CURRENT_USER.name);

  const executeSearch = () => {
    if (query.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <header className="flex items-center h-16 px-4 bg-white border-b border-gray-200 gap-2 sticky top-0 z-30 select-none">
      {/* Hamburger + Logo */}
      <div className="flex items-center gap-1 min-w-[200px] sm:min-w-[220px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Main menu</TooltipContent>
        </Tooltip>

        {/* Gmail logo text */}
        <Link to={ROUTES.INBOX} className="flex items-center gap-1 ml-2 select-none" aria-label="Gmail">
          <svg viewBox="0 0 75 30" className="h-6 w-auto" aria-hidden="true" fill="none">
            <text x="0" y="24" fontFamily="'Product Sans', 'Inter', sans-serif" fontSize="24" fontWeight="400">
              <tspan fill="#4285F4">G</tspan>
              <tspan fill="#EA4335">m</tspan>
              <tspan fill="#FBBC05">a</tspan>
              <tspan fill="#4285F4">i</tspan>
              <tspan fill="#34A853">l</tspan>
            </text>
          </svg>
        </Link>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 transition-all duration-200 ${
            searchFocused
              ? 'bg-white shadow-md ring-1 ring-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <button
            type="button"
            onClick={executeSearch}
            className="p-0.5 text-gray-500 hover:text-gray-800"
            aria-label="Search button"
          >
            <Search className="h-4 w-4 text-gray-500 flex-shrink-0" />
          </button>
          <input
            id="gmail-search"
            type="text"
            placeholder="Search mail"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-gray-700 text-sm sm:text-base outline-none placeholder:text-gray-400"
            aria-label="Search mail"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-6 w-6"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Help">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Help</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Google apps">
              <Grid3X3 className="h-5 w-5 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Google apps</TooltipContent>
        </Tooltip>

        {/* User avatar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="ml-1 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 select-none"
              style={{ backgroundColor: avatarBg }}
              aria-label={`Account: ${CURRENT_USER.name}`}
            >
              {initials}
            </button>
          </TooltipTrigger>
          <TooltipContent>{CURRENT_USER.email}</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
