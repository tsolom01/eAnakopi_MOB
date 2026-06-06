import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCPRTimerStore } from '../../stores/timerStore';
import { useAuthStore } from '../../stores/authStore';
import { secondsToTimeHHMMSS } from '../../utils/formatTime';
import { scale, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/layout';

const HomeTopBar = ({ onMenuPress, onLoginPress, onProfilePress }) => {
    const arrestTimer = useCPRTimerStore((state) => state.arrestTimer);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                style={styles.sideButton}
                onPress={onMenuPress}
                accessibilityRole="button"
                accessibilityLabel="Menu"
            >
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>

            <Text style={styles.arrestTimer} accessibilityLabel="Arrest timer">
                {secondsToTimeHHMMSS(arrestTimer)}
            </Text>

            {isAuthenticated ? (
                <TouchableOpacity
                    style={styles.sideButton}
                    onPress={onProfilePress}
                    accessibilityRole="button"
                    accessibilityLabel="Profile"
                >
                    <Ionicons name="person-circle-outline" size={scale(32)} color={COLORS.headerBg} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.sideButton}
                    onPress={onLoginPress}
                    accessibilityRole="button"
                    accessibilityLabel="Login"
                >
                    <Ionicons name="log-in-outline" size={scale(28)} color={COLORS.accent} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const SIDE_SLOT = scale(48);

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: scale(12),
        minHeight: scale(40),
    },
    sideButton: {
        width: SIDE_SLOT,
        height: SIDE_SLOT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButtonText: {
        fontSize: moderateScale(30),
        fontWeight: '300',
        color: '#333',
    },
    arrestTimer: {
        flex: 1,
        fontSize: moderateScale(28),
        fontWeight: '700',
        color: '#1A1D21',
        textAlign: 'center',
        fontVariant: ['tabular-nums'],
    },
});

export default HomeTopBar;
