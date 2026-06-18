import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { ModalScreenHeader } from '../components/common/ModalScreenHeader';
import { useAuthStore } from '../stores/authStore';
import { scale, moderateScale } from '../utils/scale';
import { COLORS } from '../styles/layout';

const ProfileField = ({ label, value }) => (
    <View style={styles.field}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
    </View>
);

const ProfileScreen = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const username = useAuthStore((state) => state.username);
    const email = useAuthStore((state) => state.email);
    const profession = useAuthStore((state) => state.profession);
    const organisation = useAuthStore((state) => state.organisation);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
                <ModalScreenHeader title={t('auth.profile')} onBack={onClose} />

                <View style={styles.content}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={scale(48)} color={COLORS.headerBg} />
                    </View>

                    <View style={styles.card}>
                        <ProfileField label={t('auth.username')} value={username} />
                        <ProfileField label={t('auth.email')} value={email} />
                        <ProfileField label={t('auth.profession')} value={profession} />
                        <ProfileField label={t('auth.organisation')} value={organisation} />
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={scale(22)} color="#FFFFFF" />
                        <Text style={styles.logoutText}>{t('auth.logout')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.background,
        zIndex: 100,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: scale(24),
        paddingTop: scale(32),
    },
    avatar: {
        width: scale(96),
        height: scale(96),
        borderRadius: scale(48),
        backgroundColor: '#F0E6EA',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scale(24),
    },
    card: {
        width: '100%',
        maxWidth: scale(360),
        backgroundColor: COLORS.surface,
        borderRadius: scale(12),
        padding: scale(20),
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: scale(32),
    },
    field: {
        marginBottom: scale(16),
    },
    fieldLabel: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: scale(4),
    },
    fieldValue: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: COLORS.text,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.danger,
        paddingVertical: scale(14),
        paddingHorizontal: scale(32),
        borderRadius: scale(10),
        gap: scale(8),
        width: '100%',
        maxWidth: scale(320),
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
});

export default ProfileScreen;
