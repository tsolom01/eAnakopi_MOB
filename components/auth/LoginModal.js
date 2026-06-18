import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../stores/authStore';
import ForgotPasswordModal from './ForgotPasswordModal';
import { scale, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/layout';

const LoginModal = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const login = useAuthStore((state) => state.login);
    const isLoggingIn = useAuthStore((state) => state.isLoggingIn);
    const loginError = useAuthStore((state) => state.loginError);

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLogin = async () => {
        const success = await login(loginId, password);
        if (success) {
            setLoginId('');
            setPassword('');
            onClose();
        }
    };

    const handleClose = () => {
        setLoginId('');
        setPassword('');
        useAuthStore.setState({ loginError: null });
        onClose();
    };

    const errorMessage = loginError ? t(`auth.errors.${loginError}`, { defaultValue: t('auth.errors.login_failed') }) : null;

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('auth.loginTitle')}</Text>
                        <TouchableOpacity onPress={handleClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                            <Ionicons name="close" size={scale(26)} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>{t('auth.loginIdentifier')}</Text>
                    <TextInput
                        style={styles.input}
                        value={loginId}
                        onChangeText={setLoginId}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholder={t('auth.loginIdentifierPlaceholder')}
                        placeholderTextColor={COLORS.textSecondary}
                        editable={!isLoggingIn}
                    />

                    <Text style={styles.label}>{t('auth.password')}</Text>
                    <View style={styles.passwordRow}>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={t('auth.passwordPlaceholder')}
                            placeholderTextColor={COLORS.textSecondary}
                            editable={!isLoggingIn}
                            onSubmitEditing={handleLogin}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword((v) => !v)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={scale(22)}
                                color={COLORS.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                    <TouchableOpacity
                        style={styles.forgotButton}
                        onPress={() => setShowForgotPassword(true)}
                        disabled={isLoggingIn}
                    >
                        <Text style={styles.forgotText}>{t('auth.forgotPassword.link')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.loginButton, isLoggingIn && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.loginButtonText}>{t('auth.login')}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <ForgotPasswordModal
                visible={showForgotPassword}
                initialLoginId={loginId}
                onClose={() => setShowForgotPassword(false)}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'center',
        paddingHorizontal: scale(24),
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: scale(14),
        padding: scale(20),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(16),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: '700',
        color: COLORS.text,
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: scale(6),
        marginTop: scale(8),
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: scale(10),
        paddingHorizontal: scale(14),
        paddingVertical: scale(12),
        fontSize: moderateScale(16),
        color: COLORS.text,
        backgroundColor: COLORS.background,
    },
    passwordRow: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: scale(44),
    },
    eyeButton: {
        position: 'absolute',
        right: scale(10),
        top: scale(12),
    },
    error: {
        color: COLORS.danger,
        fontSize: moderateScale(13),
        marginTop: scale(10),
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: scale(10),
    },
    forgotText: {
        color: COLORS.primary,
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        borderRadius: scale(10),
        paddingVertical: scale(14),
        alignItems: 'center',
        marginTop: scale(20),
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
});

export default LoginModal;
