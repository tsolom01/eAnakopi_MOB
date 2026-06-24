import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useKeepAwake } from 'expo-keep-awake';
import HomeScreen from './screens/HomeScreen';
import { useAuthStore } from './stores/authStore';

export default function App() {
    useKeepAwake();
    const restoreSession = useAuthStore((state) => state.restoreSession);

    useEffect(() => {
        restoreSession();
    }, [restoreSession]);

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }, []);

    return (
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    );
}
