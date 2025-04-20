import apiClient from "services/api/ApiClient"

/**
 * Fetch all unread notifications for the user.
 */
export const fetchUnreadNotificationsService = async() => {
    const response = await apiClient.get('/notifications');
    return response.data;
}

/**
 * Mark a specific notification as read
 */
export const markNotificationAsReadService = async(id) => {
    const patchData = {
        id: id,
    };
    const response = await apiClient.patch('/notifications', patchData);
    return response.data;
}

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsReadService = async() => {
    const response = await apiClient.post('/notifications/mark-all-as-read');
    return response.data;
}