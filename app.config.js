// Expo config — EXPO_PUBLIC_* vars are inlined at build time.
// For EAS builds, preview/production URLs are set in eas.json.
// For local dev, use .env (see .env.example).

const apiBaseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    'https://ea-94b10f92401641a89159d8440108e002.ecs.eu-central-1.on.aws';

export default {
    expo: {
        name: 'eAnakopi',
        slug: 'eanakopi',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        newArchEnabled: true,
        splash: {
            image: './assets/splash-icon.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'com.eanakopi.app',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            edgeToEdgeEnabled: true,
            package: 'com.eanakopi.app',
            usesCleartextTraffic: true,
        },
        web: {
            favicon: './assets/favicon.png',
        },
        plugins: [
            'expo-localization',
            'expo-secure-store',
            'expo-audio',
        ],
        extra: {
            apiBaseUrl,
            eas: {
                projectId: '463477d6-598c-49bb-bd7d-79658e6495ef',
            },
        },
    },
};
