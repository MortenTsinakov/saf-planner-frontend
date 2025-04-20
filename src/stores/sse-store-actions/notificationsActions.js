import { fetchUnreadNotificationsService, markAllNotificationsAsReadService, markNotificationAsReadService } from "services";

export const fetchUnreadNotifications = (set) => async() => {
    try {
        set({ error: null })
        const response = await fetchUnreadNotificationsService();
        set({ notifications: response });
        if (response.length > 0) {
            set({ hasUnread: true });
        }
    } catch (err) {
        set({ error: {message: err.response?.data?.message || "Fetching notifications failed"}});
    }
};

export const markNotificationAsRead = (get, set) => async(id) => {
    try {
        set({ error: null });
        const response = await markNotificationAsReadService(id);
        const notifications = get().notifications.filter(n => n.id !== response.id);
        if (notifications.length === 0) {
            set({ hasUnread: false });
        }
        set({ notifications: notifications});
    } catch (err) {
        set({ error: {message: err.response?.data?.message || "Marking notification as read failed"}});
    }
};

export const markAllNotificationsAsRead = (set) => async() => {
    try {
        set({ error: null });
        await markAllNotificationsAsReadService();
        set({ notifications: [], hasUnread: false });
    } catch (err) {
        set({ error: {message: err.response?.data?.message || "Marking notifications as read failed"}});
    }
}