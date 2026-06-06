import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import { useAuthStore } from './stores/authStore';

export default function App() {
    const restoreSession = useAuthStore((state) => state.restoreSession);

    useEffect(() => {
        restoreSession();
    }, [restoreSession]);

    return (
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    );
}
