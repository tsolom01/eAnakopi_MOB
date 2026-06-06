import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'auth_session';

/** @typedef {{ username: string, profession: string, organisation: string, refreshToken: string }} StoredSession */

/** Persists non-expiring refresh token and user profile (password is never stored). */
export const saveSession = async (session) => {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
};

/** @returns {Promise<StoredSession | null>} */
export const loadSession = async () => {
    const raw = await SecureStore.getItemAsync(SESSION_KEY);
    if (!raw) return null;

    try {
        const session = JSON.parse(raw);
        if (session?.refreshToken && session?.username) {
            return session;
        }
    } catch {
        // corrupted session
    }
    return null;
};

export const clearSession = async () => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    // Remove legacy password storage from earlier versions
    await SecureStore.deleteItemAsync('auth_password').catch(() => {});
    await SecureStore.deleteItemAsync('auth_username').catch(() => {});
};
