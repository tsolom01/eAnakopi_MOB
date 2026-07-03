// Expo config — env URLs live in config/environments.js (APP_ENV=development|production).
// Local: npm run dev | npm run prod. EAS: preview → dev, production → prod (see eas.json).

import { resolveEnvironment } from './config/environments.js';

const { env, appName, apiBaseUrl } = resolveEnvironment();

export default {
    expo: {
        name: appName,
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
            requireFullScreen: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            edgeToEdgeEnabled: true,
            package: 'com.eanakopi.app',
            usesCleartextTraffic: true,
            screenOrientation: 'portrait',
        },
        web: {
            favicon: './assets/favicon.png',
        },
        plugins: [
            'expo-localization',
            'expo-secure-store',
            'expo-audio',
            [
                'expo-screen-orientation',
                {
                    initialOrientation: 'PORTRAIT_UP',
                },
            ],
        ],
        extra: {
            appEnv: env,
            apiBaseUrl,
            eas: {
                projectId: '463477d6-598c-49bb-bd7d-79658e6495ef',
            },
        },
    },
};
