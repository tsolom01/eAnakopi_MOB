import { apiRequest } from '../api/client';

/**
 * Uploads the ACLS session history to the server.
 * Fails silently — history upload should not block the UI.
 */
export const postHistory = async (accessToken, payload) => {
    if (!accessToken) return { success: false, error: 'not_authenticated' };

    try {
        const { response, body } = await apiRequest('/history', {
            method: 'POST',
            accessToken,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            if (__DEV__ && body?.detail) {
                console.warn('[history/post] server detail:', body.detail);
            }
            return { success: false, error: body?.error ?? 'save_failed' };
        }

        return { success: true, data: body.data };
    } catch (err) {
        if (__DEV__) {
            console.warn('[history/post] network error:', err?.message ?? err);
        }
        return { success: false, error: 'network_error' };
    }
};
