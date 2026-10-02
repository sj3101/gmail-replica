/**
 * Email API — wrapper around persistent email data manager.
 * All functions return Promises to simulate async behavior.
 */
import {
  getEmailsByFolder,
  getEmailsByCategory,
  getEmailById,
  getUnreadCount,
  searchEmails,
  markAsRead,
  toggleStar,
  setStarStatus,
  archiveEmails,
  moveToTrash,
  restoreFromTrash,
  markSpam,
  deleteForever,
  sendEmail,
  saveDraft,
  subscribeToEmailChanges,
} from '@/data';

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const emailApi = {
  subscribe: subscribeToEmailChanges,

  async getByFolder(folder) {
    await delay();
    return getEmailsByFolder(folder);
  },

  async getByCategory(category) {
    await delay();
    return getEmailsByCategory(category);
  },

  async getById(id) {
    await delay();
    const email = getEmailById(id);
    if (!email) throw new Error(`Email not found: ${id}`);
    return email;
  },

  async getUnreadCount(folder) {
    await delay(30);
    return getUnreadCount(folder);
  },

  async search(query) {
    await delay(150);
    return searchEmails(query);
  },

  async markRead(ids, isRead = true) {
    await delay(50);
    markAsRead(ids, isRead);
    return { success: true };
  },

  async toggleStar(id) {
    await delay(50);
    const isStarred = toggleStar(id);
    return { success: true, isStarred };
  },

  async setStar(ids, isStarred = true) {
    await delay(50);
    setStarStatus(ids, isStarred);
    return { success: true };
  },

  async archive(ids) {
    await delay(100);
    archiveEmails(ids);
    return { success: true };
  },

  async moveToTrash(ids) {
    await delay(100);
    moveToTrash(ids);
    return { success: true };
  },

  async restoreFromTrash(ids) {
    await delay(100);
    restoreFromTrash(ids);
    return { success: true };
  },

  async markSpam(ids) {
    await delay(100);
    markSpam(ids);
    return { success: true };
  },

  async deleteForever(ids) {
    await delay(100);
    deleteForever(ids);
    return { success: true };
  },

  async sendEmail(data) {
    await delay(200);
    const sent = sendEmail(data);
    return { success: true, email: sent };
  },

  async saveDraft(data) {
    await delay(150);
    const draftId = saveDraft(data);
    return { success: true, draftId };
  },
};
