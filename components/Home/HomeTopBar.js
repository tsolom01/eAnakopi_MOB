import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCPRTimerStore } from '../../stores/timerStore';
import { secondsToTimeHHMMSS } from '../../utils/formatTime';
import { scale, moderateScale } from '../../utils/scale';

const HomeTopBar = ({ onMenuPress }) => {
    const arrestTimer = useCPRTimerStore((state) => state.arrestTimer);

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={onMenuPress}
                accessibilityRole="button"
                accessibilityLabel="Menu"
            >
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>

            <Text style={styles.arrestTimer} accessibilityLabel="Arrest timer">
                {secondsToTimeHHMMSS(arrestTimer)}
            </Text>

            <View style={styles.menuSpacer} />
        </View>
    );
};

const MENU_SLOT = scale(48);

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: scale(12),
        minHeight: scale(40),
    },
    menuButton: {
        width: MENU_SLOT,
        height: MENU_SLOT,
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
    menuSpacer: {
        width: MENU_SLOT,
    },
});

export default HomeTopBar;
