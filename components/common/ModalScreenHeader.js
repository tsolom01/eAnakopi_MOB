import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale } from '../../utils/scale';
import { COLORS } from '../../styles/layout';

export const ModalScreenHeader = ({ title, onBack, variant = 'light' }) => {
    const isDark = variant === 'dark';
    const iconColor = isDark ? '#FFFFFF' : COLORS.text;
    const titleColor = isDark ? '#FFFFFF' : COLORS.text;

    return (
        <View style={[styles.header, isDark && styles.headerDark]}>
            <TouchableOpacity
                onPress={onBack}
                style={styles.backButton}
                accessibilityRole="button"
                accessibilityLabel="Back"
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
                <Ionicons name="chevron-back" size={scale(28)} color={iconColor} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: titleColor }]} numberOfLines={2}>
                {title}
            </Text>
            <View style={styles.spacer} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(8),
        paddingVertical: scale(12),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    headerDark: {
        backgroundColor: COLORS.headerBg,
        borderBottomColor: 'transparent',
    },
    backButton: {
        width: scale(44),
        height: scale(44),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        fontSize: scale(20),
        fontWeight: '700',
        textAlign: 'center',
    },
    spacer: {
        width: scale(44),
    },
});
