import { create } from 'zustand';
import { login as loginApi, logout as logoutApi, refreshSession as refreshSessionApi } from '../services/auth/authApi';
import { postHistory } from '../services/history/historyApi';
import { saveSession, loadSession, clearSession } from '../services/auth/secureSession';

const initialState = {
    username: null,
    email: null,
    profession: null,
    organisation: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isRestoring: true,
    isLoggingIn: false,
    loginError: null,
};

const toPersistedSession = (data) => ({
    username: data.username,
    email: data.email ?? null,
    profession: data.profession,
    organisation: data.organisation,
    refreshToken: data.refreshToken,
});

const applySession = (data, { includeAccessToken = true } = {}) => ({
    username: data.username,
    email: data.email ?? null,
    profession: data.profession,
    organisation: data.organisation,
    refreshToken: data.refreshToken,
    accessToken: includeAccessToken ? (data.accessToken ?? null) : null,
    isAuthenticated: true,
    isLoggingIn: false,
    loginError: null,
});

export const useAuthStore = create((set, get) => ({
    ...initialState,

    /** Restores profile from secure storage — no network call. */
    restoreSession: async () => {
        set({ isRestoring: true, loginError: null });
        try {
            const session = await loadSession();
            if (session?.refreshToken && session?.username) {
                set({
                    ...applySession(session, { includeAccessToken: false }),
                    isRestoring: false,
                });
                return;
            }
            set({ ...initialState, isRestoring: false });
        } catch {
            set({ ...initialState, isRestoring: false });
        }
    },

    login: async (loginId, password) => {
        set({ isLoggingIn: true, loginError: null });
        try {
            const result = await loginApi(loginId, password);
            if (!result.success) {
                set({ isLoggingIn: false, loginError: result.error ?? 'invalid_credentials' });
                return false;
            }

            await saveSession(toPersistedSession(result.data));
            set(applySession(result.data));
            return true;
        } catch {
            set({ isLoggingIn: false, loginError: 'login_failed' });
            return false;
        }
    },

    logout: async () => {
        const { refreshToken } = get();
        await logoutApi(refreshToken);
        await clearSession();
        set({ ...initialState, isRestoring: false });
    },

    /** Fetches a fresh access token via refresh — only called when an API request needs it. */
    ensureAccessToken: async (forceRefresh = false) => {
        const { accessToken, refreshToken, isAuthenticated } = get();
        if (!isAuthenticated || !refreshToken) return null;
        if (accessToken && !forceRefresh) return accessToken;

        const refreshed = await refreshSessionApi(refreshToken);
        if (!refreshed.success) return null;

        await saveSession(toPersistedSession(refreshed.data));
        set(applySession(refreshed.data));
        return refreshed.data.accessToken;
    },

    uploadSessionHistory: async (payload) => {
        if (!get().isAuthenticated) {
            return { success: false, error: 'not_authenticated' };
        }

        let token = await get().ensureAccessToken();
        if (!token) {
            return { success: false, error: 'not_authenticated' };
        }

        let result = await postHistory(token, payload);
        if (result.error === 'token_expired') {
            token = await get().ensureAccessToken(true);
            if (token) {
                result = await postHistory(token, payload);
            }
        }

        return result;
    },
}));
