import { EMAIL_CATEGORIES, FOLDERS } from '@/constants';

// Simulated current user
export const CURRENT_USER = {
  id: 'user-001',
  name: 'Alex Johnson',
  email: 'alex.johnson@gmail.com',
  avatar: null, // will use initials fallback
};

// Helper: generate a date string relative to now
const daysAgo = (days, hours = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
};

// 20 initial mock emails covering multiple folders and categories
export const INITIAL_MOCK_EMAILS = [
  {
    id: 'email-001',
    subject: 'Welcome to your new inbox!',
    from: { name: 'Gmail Team', email: 'noreply@gmail.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi Alex,</p><p>Welcome to Gmail! Here you'll find all your emails organized neatly. We've made it easy to read, send, and organize your mail.</p><p>Happy emailing!<br/>The Gmail Team</p>`,
    snippet: 'Hi Alex, Welcome to Gmail! Here you\'ll find all your emails organized neatly...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: true,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(0, 1),
    threadId: 'thread-001',
    threadCount: 1,
  },
  {
    id: 'email-002',
    subject: 'Your GitHub security alert',
    from: { name: 'GitHub', email: 'noreply@github.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi @alexj,</p><p>We found a vulnerability in one of your dependencies. Please update <strong>lodash</strong> to version 4.17.21 or later.</p><p>View alert on GitHub →</p>`,
    snippet: 'We found a vulnerability in one of your dependencies. Please update lodash...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: false,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['security'],
    date: daysAgo(0, 2),
    threadId: 'thread-002',
    threadCount: 1,
  },
  {
    id: 'email-003',
    subject: 'React Conf 2025 — Registration Now Open 🎉',
    from: { name: 'React Conference', email: 'info@reactconf.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Dear Developer,</p><p>We're excited to announce that <strong>React Conf 2025</strong> registration is now open! Join thousands of developers from around the world for two days of talks, workshops, and networking.</p><p>Early bird tickets are available until March 31st.</p>`,
    snippet: 'We\'re excited to announce that React Conf 2025 registration is now open!',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PROMOTIONS,
    isRead: false,
    isStarred: true,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: true,
    labels: ['conferences'],
    date: daysAgo(1),
    threadId: 'thread-003',
    threadCount: 1,
  },
  {
    id: 'email-004',
    subject: 'Re: Project Milestone Update — Q4 Review',
    from: { name: 'Sarah Chen', email: 'sarah.chen@company.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [{ name: 'Michael Torres', email: 'michael.t@company.com' }],
    bcc: [],
    body: `<p>Hey Alex,</p><p>Thanks for the update! The Q4 deliverables look great. I've reviewed the design mockups and have a few comments:</p><ul><li>The dashboard layout needs more spacing</li><li>Colors look good overall</li><li>Mobile responsiveness is excellent</li></ul><p>Let's sync Thursday at 2pm?</p><p>Best,<br/>Sarah</p>`,
    snippet: 'Thanks for the update! The Q4 deliverables look great. I\'ve reviewed...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: false,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: true,
    labels: ['work'],
    date: daysAgo(1, 3),
    threadId: 'thread-004',
    threadCount: 4,
  },
  {
    id: 'email-005',
    subject: 'LinkedIn: 12 people viewed your profile this week',
    from: { name: 'LinkedIn', email: 'notifications@linkedin.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi Alex,</p><p>Your profile is getting attention! <strong>12 people</strong> viewed your profile this week — that's up 40% from last week.</p><p>See who viewed your profile →</p>`,
    snippet: 'Your profile is getting attention! 12 people viewed your profile this week...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.SOCIAL,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(2),
    threadId: 'thread-005',
    threadCount: 1,
  },
  {
    id: 'email-006',
    subject: 'Your Amazon order has shipped! 📦',
    from: { name: 'Amazon', email: 'shipment-tracking@amazon.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hello Alex,</p><p>Great news! Your order <strong>#112-3456789-0123456</strong> has shipped and is on its way.</p><p>Estimated delivery: <strong>Tomorrow by 8 PM</strong></p><p>Track your package →</p>`,
    snippet: 'Great news! Your order #112-3456789-0123456 has shipped and is on its way.',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['shopping'],
    date: daysAgo(2, 5),
    threadId: 'thread-006',
    threadCount: 1,
  },
  {
    id: 'email-007',
    subject: 'Team lunch this Friday — RSVP needed',
    from: { name: 'Marcus Williams', email: 'm.williams@company.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [
      { name: 'Sarah Chen', email: 'sarah.chen@company.com' },
      { name: 'Jordan Kim', email: 'j.kim@company.com' },
    ],
    bcc: [],
    body: `<p>Hey team!</p><p>Quick reminder that we have a team lunch this <strong>Friday at noon</strong> at The Garden Bistro on 5th Ave. Please RSVP by Wednesday so I can make the reservation.</p><p>Looking forward to seeing everyone!<br/>Marcus</p>`,
    snippet: 'Quick reminder that we have a team lunch this Friday at noon at The Garden Bistro...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: false,
    isStarred: true,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['work', 'social'],
    date: daysAgo(3),
    threadId: 'thread-007',
    threadCount: 3,
  },
  {
    id: 'email-008',
    subject: 'New comment on your Stack Overflow post',
    from: { name: 'Stack Overflow', email: 'noreply@stackoverflow.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi Alex,</p><p><strong>user8472</strong> commented on your answer to: <em>"How to debounce a function in JavaScript?"</em></p><blockquote>This solution works great! Thanks for the detailed explanation with examples.</blockquote><p>View the thread →</p>`,
    snippet: 'user8472 commented on your answer to: "How to debounce a function in JavaScript?"',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.FORUMS,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(3, 6),
    threadId: 'thread-008',
    threadCount: 1,
  },
  {
    id: 'email-009',
    subject: 'Your Vercel deployment succeeded ✅',
    from: { name: 'Vercel', email: 'noreply@vercel.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hey Alex,</p><p>Your latest deployment to <strong>production</strong> was successful!</p><p><strong>Project:</strong> gmail-replica<br/><strong>Commit:</strong> feat: add email threading<br/><strong>Duration:</strong> 38s</p><p>Visit your deployment →</p>`,
    snippet: 'Your latest deployment to production was successful! Project: gmail-replica...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['dev'],
    date: daysAgo(4),
    threadId: 'thread-009',
    threadCount: 1,
  },
  {
    id: 'email-010',
    subject: '50% OFF — Flash Sale ends tonight midnight!',
    from: { name: 'Figma', email: 'noreply@figma.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Don't miss out!</p><p>Upgrade to <strong>Figma Professional</strong> at 50% off — today only. This is the lowest price we've offered all year.</p><p>Get the deal →</p>`,
    snippet: 'Don\'t miss out! Upgrade to Figma Professional at 50% off — today only...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PROMOTIONS,
    isRead: false,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(5),
    threadId: 'thread-010',
    threadCount: 1,
  },
  {
    id: 'email-011',
    subject: 'Invoice #2025-089 — Payment Received',
    from: { name: 'FreshBooks', email: 'billing@freshbooks.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Dear Alex,</p><p>Payment of <strong>$1,250.00</strong> has been received for Invoice #2025-089. Thank you!</p><p>Download your receipt →</p>`,
    snippet: 'Payment of $1,250.00 has been received for Invoice #2025-089. Thank you!',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: true,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: true,
    labels: ['finance'],
    date: daysAgo(6),
    threadId: 'thread-011',
    threadCount: 2,
  },
  {
    id: 'email-012',
    subject: 'Draft: New project proposal for client meeting',
    from: { name: 'Alex Johnson', email: 'alex.johnson@gmail.com', avatar: null },
    to: [{ name: 'James Park', email: 'j.park@clientco.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi James,</p><p>[DRAFT] Here is the initial project proposal for...</p>`,
    snippet: '[DRAFT] Here is the initial project proposal for the upcoming Q1 initiative...',
    folder: FOLDERS.DRAFTS,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(4),
    threadId: 'thread-012',
    threadCount: 1,
  },
  {
    id: 'email-013',
    subject: 'Re: Design system feedback',
    from: { name: 'Alex Johnson', email: 'alex.johnson@gmail.com', avatar: null },
    to: [{ name: 'Jordan Kim', email: 'j.kim@company.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hey Jordan,</p><p>Thanks for the thorough review! I'll incorporate all of your suggestions into the next iteration of the design system. Let me know if you have time to meet next week to go over the revised components.</p><p>Best,<br/>Alex</p>`,
    snippet: 'Thanks for the thorough review! I\'ll incorporate all your suggestions...',
    folder: FOLDERS.SENT,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['work'],
    date: daysAgo(3, 2),
    threadId: 'thread-013',
    threadCount: 6,
  },
  {
    id: 'email-014',
    subject: 'Get 3 months of Spotify Premium FREE!',
    from: { name: 'Spotify', email: 'noreply@spotify.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi there,</p><p>Upgrade to Spotify Premium and enjoy 3 months FREE — no ads, offline listening, and unlimited skips.</p><p>Claim your free trial →</p>`,
    snippet: 'Upgrade to Spotify Premium and enjoy 3 months FREE — no ads, offline listening...',
    folder: FOLDERS.SPAM,
    category: EMAIL_CATEGORIES.PROMOTIONS,
    isRead: false,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(7),
    threadId: 'thread-014',
    threadCount: 1,
  },
  {
    id: 'email-015',
    subject: 'Old newsletter unsubscribe confirmation',
    from: { name: 'TechWeekly', email: 'newsletter@techweekly.io', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>You've been successfully unsubscribed from TechWeekly.</p><p>We're sorry to see you go. You can re-subscribe at any time.</p>`,
    snippet: 'You\'ve been successfully unsubscribed from TechWeekly. We\'re sorry to see you go.',
    folder: FOLDERS.TRASH,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(10),
    threadId: 'thread-015',
    threadCount: 1,
  },
  {
    id: 'email-016',
    subject: 'Reminder: Doctor appointment tomorrow at 10am',
    from: { name: 'Google Calendar', email: 'calendar-notification@google.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>This is a reminder for your upcoming event:</p><p><strong>Doctor Appointment</strong><br/>Tomorrow, October 3rd at 10:00 AM<br/>Dr. Priya Sharma — City Medical Center</p><p>Add to calendar →</p>`,
    snippet: 'Reminder: Doctor Appointment — Tomorrow, October 3rd at 10:00 AM. Dr. Priya Sharma...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: false,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['personal'],
    date: daysAgo(0, 0),
    threadId: 'thread-016',
    threadCount: 1,
  },
  {
    id: 'email-017',
    subject: 'Twitter/X: Someone retweeted your post',
    from: { name: 'X (Twitter)', email: 'info@twitter.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hi Alex,</p><p><strong>@devloper_dan</strong> retweeted your post about React Server Components. Your post now has 234 retweets and 1.2K likes!</p><p>View on X →</p>`,
    snippet: '@devloper_dan retweeted your post about React Server Components. Your post now has...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.SOCIAL,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: daysAgo(2, 8),
    threadId: 'thread-017',
    threadCount: 1,
  },
  {
    id: 'email-018',
    subject: 'RE: Can you review the PR before EOD?',
    from: { name: 'Priya Patel', email: 'priya.p@company.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Hey Alex,</p><p>Absolutely! I'll take a look at the PR right after my standup. Should be done by noon. Quick heads-up — you might want to add some unit tests to the new utility functions.</p><p>Cheers,<br/>Priya</p>`,
    snippet: 'Absolutely! I\'ll take a look at the PR right after my standup. Should be done...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: false,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['work', 'code-review'],
    date: daysAgo(0, 3),
    threadId: 'thread-018',
    threadCount: 5,
  },
  {
    id: 'email-019',
    subject: 'Your monthly bank statement is ready',
    from: { name: 'Chase Bank', email: 'statements@chase.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [],
    bcc: [],
    body: `<p>Dear Alex,</p><p>Your statement for September 2025 is now available. Log in to your account to view and download your statement.</p><p>Account ending: ****4892<br/>Statement period: Sep 1 – Sep 30, 2025</p>`,
    snippet: 'Your statement for September 2025 is now available. Log in to your account to view...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.UPDATES,
    isRead: true,
    isStarred: false,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: true,
    labels: ['finance'],
    date: daysAgo(8),
    threadId: 'thread-019',
    threadCount: 1,
  },
  {
    id: 'email-020',
    subject: 'Invitation: Frontend Guild weekly sync — Every Thursday 4pm',
    from: { name: 'Jordan Kim', email: 'j.kim@company.com', avatar: null },
    to: [{ name: 'Alex Johnson', email: 'alex.johnson@gmail.com' }],
    cc: [
      { name: 'Marcus Williams', email: 'm.williams@company.com' },
      { name: 'Priya Patel', email: 'priya.p@company.com' },
      { name: 'Sarah Chen', email: 'sarah.chen@company.com' },
    ],
    bcc: [],
    body: `<p>Hey folks,</p><p>I'm setting up a recurring weekly sync for the Frontend Guild. We'll discuss component libraries, new patterns, and share learnings.</p><p><strong>When:</strong> Every Thursday, 4:00–4:45 PM<br/><strong>Where:</strong> Zoom link in calendar invite</p><p>See you there!<br/>Jordan</p>`,
    snippet: 'I\'m setting up a recurring weekly sync for the Frontend Guild. We\'ll discuss...',
    folder: FOLDERS.INBOX,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: false,
    isStarred: true,
    isImportant: true,
    isSnoozed: false,
    hasAttachments: false,
    labels: ['work', 'meetings'],
    date: daysAgo(1, 4),
    threadId: 'thread-020',
    threadCount: 1,
  },
];

// LocalStorage persistence & PubSub event listeners
const STORAGE_KEY = 'gmail_replica_emails';
const listeners = new Set();

function loadEmailsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load emails from localStorage', e);
  }
  // Fallback to initial mock emails
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_EMAILS));
  } catch (e) {
    // ignore
  }
  return [...INITIAL_MOCK_EMAILS];
}

let storedEmails = loadEmailsFromStorage();

export function subscribeToEmailChanges(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function saveStoredEmails(newEmails) {
  storedEmails = [...newEmails];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedEmails));
  } catch (e) {
    console.error('Failed to save emails to localStorage', e);
  }
  listeners.forEach((fn) => fn(storedEmails));
}

// Export reactive getter
export function getStoredEmails() {
  return storedEmails;
}

// Utility: filter emails by folder
export const getEmailsByFolder = (folder) => {
  if (folder === FOLDERS.ALL_MAIL) {
    return storedEmails.filter((e) => e.folder !== FOLDERS.TRASH && e.folder !== FOLDERS.SPAM);
  }
  if (folder === FOLDERS.STARRED) {
    return storedEmails.filter((e) => e.isStarred && e.folder !== FOLDERS.TRASH);
  }
  return storedEmails.filter((email) => email.folder === folder);
};

// Utility: filter inbox emails by category
export const getEmailsByCategory = (category) =>
  storedEmails.filter(
    (email) => email.folder === FOLDERS.INBOX && email.category === category
  );

// Utility: find single email by id
export const getEmailById = (id) => storedEmails.find((email) => email.id === id);

// Utility: count unread emails per folder
export const getUnreadCount = (folder) => {
  if (folder === FOLDERS.STARRED) {
    return storedEmails.filter((e) => e.isStarred && !e.isRead && e.folder !== FOLDERS.TRASH).length;
  }
  if (folder === FOLDERS.ALL_MAIL) {
    return storedEmails.filter((e) => !e.isRead && e.folder !== FOLDERS.TRASH && e.folder !== FOLDERS.SPAM).length;
  }
  return storedEmails.filter((email) => email.folder === folder && !email.isRead).length;
};

// Search helper
export const searchEmails = (query) => {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return storedEmails.filter(
    (email) =>
      email.subject?.toLowerCase().includes(q) ||
      email.snippet?.toLowerCase().includes(q) ||
      email.body?.toLowerCase().includes(q) ||
      email.from?.name?.toLowerCase().includes(q) ||
      email.from?.email?.toLowerCase().includes(q)
  );
};

// Mutation actions
export const markAsRead = (ids, isRead = true) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.map((e) =>
    targetIds.includes(e.id) ? { ...e, isRead } : e
  );
  saveStoredEmails(updated);
};

export const toggleStar = (id) => {
  let newState = false;
  const updated = storedEmails.map((e) => {
    if (e.id === id) {
      newState = !e.isStarred;
      return { ...e, isStarred: newState };
    }
    return e;
  });
  saveStoredEmails(updated);
  return newState;
};

export const setStarStatus = (ids, isStarred) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.map((e) =>
    targetIds.includes(e.id) ? { ...e, isStarred } : e
  );
  saveStoredEmails(updated);
};

export const archiveEmails = (ids) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.map((e) =>
    targetIds.includes(e.id) ? { ...e, folder: FOLDERS.ALL_MAIL } : e
  );
  saveStoredEmails(updated);
};

export const moveToTrash = (ids) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.map((e) =>
    targetIds.includes(e.id) ? { ...e, folder: FOLDERS.TRASH } : e
  );
  saveStoredEmails(updated);
};

export const restoreFromTrash = (ids) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.map((e) =>
    targetIds.includes(e.id) ? { ...e, folder: FOLDERS.INBOX } : e
  );
  saveStoredEmails(updated);
};

export const markSpam = (ids) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.map((e) =>
    targetIds.includes(e.id) ? { ...e, folder: FOLDERS.SPAM } : e
  );
  saveStoredEmails(updated);
};

export const deleteForever = (ids) => {
  const targetIds = Array.isArray(ids) ? ids : [ids];
  const updated = storedEmails.filter((e) => !targetIds.includes(e.id));
  saveStoredEmails(updated);
};

export const sendEmail = ({ to, subject, body }) => {
  const newEmail = {
    id: `email-${Date.now()}`,
    subject: subject || '(no subject)',
    from: { name: CURRENT_USER.name, email: CURRENT_USER.email, avatar: null },
    to: [{ name: to || 'Recipient', email: to || '' }],
    cc: [],
    bcc: [],
    body: body ? `<p>${body.replace(/\n/g, '<br/>')}</p>` : '<p></p>',
    snippet: body ? body.substring(0, 100) : '',
    folder: FOLDERS.SENT,
    category: EMAIL_CATEGORIES.PRIMARY,
    isRead: true,
    isStarred: false,
    isImportant: false,
    isSnoozed: false,
    hasAttachments: false,
    labels: [],
    date: new Date().toISOString(),
    threadId: `thread-${Date.now()}`,
    threadCount: 1,
  };
  saveStoredEmails([newEmail, ...storedEmails]);
  return newEmail;
};

export const saveDraft = ({ id, to, subject, body }) => {
  let draftId = id;
  let updated;
  if (draftId && storedEmails.some((e) => e.id === draftId)) {
    updated = storedEmails.map((e) => {
      if (e.id === draftId) {
        return {
          ...e,
          subject: subject || '(no subject)',
          to: [{ name: to || '', email: to || '' }],
          body: body ? `<p>${body.replace(/\n/g, '<br/>')}</p>` : '<p></p>',
          snippet: body ? body.substring(0, 100) : '',
          date: new Date().toISOString(),
        };
      }
      return e;
    });
  } else {
    draftId = `draft-${Date.now()}`;
    const newDraft = {
      id: draftId,
      subject: subject || '(no subject)',
      from: { name: CURRENT_USER.name, email: CURRENT_USER.email, avatar: null },
      to: [{ name: to || '', email: to || '' }],
      cc: [],
      bcc: [],
      body: body ? `<p>${body.replace(/\n/g, '<br/>')}</p>` : '<p></p>',
      snippet: body ? body.substring(0, 100) : '',
      folder: FOLDERS.DRAFTS,
      category: EMAIL_CATEGORIES.PRIMARY,
      isRead: true,
      isStarred: false,
      isImportant: false,
      isSnoozed: false,
      hasAttachments: false,
      labels: [],
      date: new Date().toISOString(),
      threadId: `thread-${draftId}`,
      threadCount: 1,
    };
    updated = [newDraft, ...storedEmails];
  }
  saveStoredEmails(updated);
  return draftId;
};
