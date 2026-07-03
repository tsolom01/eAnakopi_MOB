import { Platform } from 'react-native';
import Constants from 'expo-constants';

/** Default API URL per platform when no env config is set. */
const getDefaultApiUrl = () => {
    if (Platform.OS === 'android') {
        // Android emulator: host machine is 10.0.2.2
        return 'http://10.0.2.2:3000';
    }
    // iOS simulator and web can use localhost
    return 'http://localhost:3000';
};

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    Constants.expoConfig?.extra?.apiBaseUrl ??
    getDefaultApiUrl();

export const config = {
    apiBaseUrl: API_BASE_URL.replace(/\/$/, ''),
};

if (__DEV__) {
    console.log('[config] API base URL:', config.apiBaseUrl);
}
