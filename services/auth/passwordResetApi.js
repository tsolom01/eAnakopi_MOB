import { apiRequest } from '../api/client';

/**
 * Requests a password reset code sent to the account email.
 */
export const requestPasswordReset = async (loginId) => {
    if (!loginId?.trim()) {
        return { success: false, error: 'missing_login' };
    }

    try {
        const { response, body } = await apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ login: loginId.trim() }),
        });

        if (!response.ok) {
            return { success: false, error: body?.error ?? 'reset_request_failed' };
        }

        return { success: true };
    } catch {
        return { success: false, error: 'network_error' };
    }
};

/**
 * Resets the password using the emailed code.
 */
export const resetPassword = async (loginId, code, newPassword) => {
    if (!loginId?.trim() || !code?.trim() || !newPassword?.trim()) {
        return { success: false, error: 'missing_fields' };
    }

    try {
        const { response, body } = await apiRequest('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({
                login: loginId.trim(),
                code: code.trim(),
                newPassword,
            }),
        });

        if (!response.ok) {
            return { success: false, error: body?.error ?? 'reset_failed' };
        }

        return { success: true };
    } catch {
        return { success: false, error: 'network_error' };
    }
};
