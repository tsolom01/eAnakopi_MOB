import { create } from 'zustand';
import { login as loginApi } from '../services/auth/authApi';
import { saveSession, loadSession, clearSession } from '../services/auth/secureSession';

const initialState = {
    username: null,
    profession: null,
    organisation: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isRestoring: true,
    isLoggingIn: false,
    loginError: null,
};

export const useAuthStore = create((set) => ({
    ...initialState,

    restoreSession: async () => {
        set({ isRestoring: true, loginError: null });
        try {
            const session = await loadSession();
            if (session) {
                set({
                    username: session.username,
                    profession: session.profession,
                    organisation: session.organisation,
                    refreshToken: session.refreshToken,
                    accessToken: null,
                    isAuthenticated: true,
                    isRestoring: false,
                });
                return;
            }
            set({ ...initialState, isRestoring: false });
        } catch {
            set({ ...initialState, isRestoring: false });
        }
    },

    login: async (username, password) => {
        set({ isLoggingIn: true, loginError: null });
        try {
            const result = await loginApi(username, password);
            if (!result.success) {
                set({ isLoggingIn: false, loginError: result.error ?? 'invalid_credentials' });
                return false;
            }

            const { accessToken, refreshToken, profession, organisation } = result.data;

            await saveSession({
                username: result.data.username,
                profession,
                organisation,
                refreshToken,
            });

            set({
                username: result.data.username,
                profession,
                organisation,
                accessToken,
                refreshToken,
                isAuthenticated: true,
                isLoggingIn: false,
                loginError: null,
            });
            return true;
        } catch {
            set({ isLoggingIn: false, loginError: 'login_failed' });
            return false;
        }
    },

    logout: async () => {
        await clearSession();
        set({ ...initialState, isRestoring: false });
    },
}));
