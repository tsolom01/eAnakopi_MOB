/**
 * Authenticates the user and returns profile data with tokens.
 * TODO: Replace with real API call when endpoint is available.
 */
export const login = async (username, password) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!username?.trim() || !password?.trim()) {
        return { success: false, error: 'missing_credentials' };
    }

    return {
        success: true,
        data: {
            username: username.trim(),
            profession: 'Emergency Physician',
            organisation: 'General Hospital',
            accessToken: `mock_access_${Date.now()}`,
            refreshToken: `mock_refresh_${username.trim()}`,
        },
    };
};
