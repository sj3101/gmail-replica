// Route path constants for React Router v7
export const ROUTES = {
  // Root
  ROOT: '/',

  // Mail sections
  INBOX: '/inbox',
  STARRED: '/starred',
  SNOOZED: '/snoozed',
  SENT: '/sent',
  DRAFTS: '/drafts',
  TRASH: '/trash',
  SPAM: '/spam',
  ALL_MAIL: '/all-mail',

  // Mail categories (tabs inside inbox)
  INBOX_PRIMARY: '/inbox/primary',
  INBOX_SOCIAL: '/inbox/social',
  INBOX_PROMOTIONS: '/inbox/promotions',
  INBOX_UPDATES: '/inbox/updates',
  INBOX_FORUMS: '/inbox/forums',

  // Single email view
  EMAIL: '/mail/:emailId',
  EMAIL_IN_FOLDER: '/:folder/:emailId',

  // Compose (modal route)
  COMPOSE: '/compose',

  // Search
  SEARCH: '/search',

  // Settings
  SETTINGS: '/settings',
  SETTINGS_GENERAL: '/settings/general',
  SETTINGS_LABELS: '/settings/labels',
  SETTINGS_INBOX: '/settings/inbox',

  // Label / folder
  LABEL: '/label/:labelName',
};

// Helper to build dynamic routes
export const buildRoute = {
  email: (emailId) => `/mail/${emailId}`,
  emailInFolder: (folder, emailId) => `/${folder}/${emailId}`,
  label: (labelName) => `/label/${labelName}`,
  search: (query) => `/search?q=${encodeURIComponent(query)}`,
};
