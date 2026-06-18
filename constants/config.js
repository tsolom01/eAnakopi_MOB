import { Platform } from 'react-native';

/** Default API URL per platform when EXPO_PUBLIC_API_BASE_URL is not set. */
const getDefaultApiUrl = () => {
    if (Platform.OS === 'android') {
        // Android emulator: host machine is 10.0.2.2
        return 'http://10.0.2.2:3000';
    }
    // iOS simulator and web can use localhost
    return 'http://localhost:3000';
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? getDefaultApiUrl();

export const config = {
    apiBaseUrl: API_BASE_URL.replace(/\/$/, ''),
};

if (__DEV__) {
    console.log('[config] API base URL:', config.apiBaseUrl);
}
