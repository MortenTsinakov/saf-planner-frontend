import { API_BASE_URL } from "constants/Constants";
import { fetchUnreadNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "./sse-store-actions/notificationsActions";

const { create } = require("zustand")

const initialState = {
    eventSource: null,
    notifications: [],
    hasUnread: false,
    error: null,
}

const useSseStore = create((set, get) => ({
    ...initialState,

    // Reset state
    reset: () => set(initialState),

    // Setters
    setHasUnread: (hasUnread) => set({ hasUnread }),

    fetchUnreadNotifications: fetchUnreadNotifications(set),
    markNotificationAsRead: markNotificationAsRead(get, set),
    markAllNotificationsAsRead: markAllNotificationsAsRead(set),

    connect: () => {
        const url = `${API_BASE_URL}/notifications/subscribe`;
        const source = new EventSource(url, {withCredentials: true});

        source.onopen = (event) => {
            console.log(event.data);
        }

        source.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            set({
                notifications: [notification, ...get().notifications],
                hasUnread: true
            })
        };

        source.onerror = (err) => {
            console.error("SSE error:", err);
            source.close();
            set({ eventSource: null});
        }

        set({ eventSource: source });
    },
    disconnect: () => {
        const current = get().eventSource;
        if (current) {
            current.close();
            set({ eventSource: null });
        }
    },
}));

export default useSseStore;