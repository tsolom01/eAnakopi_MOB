import { apiRequest } from '../api/client';

/**
 * Authenticates with username or email.
 */
export const login = async (loginId, password) => {
    if (!loginId?.trim() || !password?.trim()) {
        return { success: false, error: 'missing_credentials' };
    }

    try {
        const { response, body } = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ login: loginId.trim(), password }),
        });

        if (!response.ok) {
            return { success: false, error: body?.error ?? 'invalid_credentials' };
        }

        return { success: true, data: body.data };
    } catch (err) {
        if (__DEV__) {
            console.warn('[auth/login] network error:', err?.message ?? err);
        }
        return { success: false, error: 'network_error' };
    }
};

/**
 * Revokes the user's refresh token on the server.
 */
export const logout = async (refreshToken) => {
    if (!refreshToken) return;

    try {
        await apiRequest('/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
        });
    } catch {
        // Client-side session is cleared regardless
    }
};

/**
 * Refreshes the access token using a stored refresh token.
 */
export const refreshSession = async (refreshToken) => {
    try {
        const { response, body } = await apiRequest('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            return { success: false, error: body?.error ?? 'invalid_token' };
        }

        return { success: true, data: body.data };
    } catch {
        return { success: false, error: 'refresh_failed' };
    }
};
