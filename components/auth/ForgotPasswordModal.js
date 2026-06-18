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
import { requestPasswordReset, resetPassword } from '../../services/auth/passwordResetApi';
import { scale, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/layout';

const ForgotPasswordModal = ({ visible, onClose, initialLoginId = '' }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState('request');
    const [loginId, setLoginId] = useState(initialLoginId);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);

    const resetForm = () => {
        setStep('request');
        setLoginId(initialLoginId);
        setCode('');
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setError(null);
        setInfo(null);
        setIsLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleRequestCode = async () => {
        setError(null);
        setInfo(null);
        setIsLoading(true);

        const result = await requestPasswordReset(loginId);
        setIsLoading(false);

        if (!result.success) {
            setError(result.error);
            return;
        }

        setInfo('code_sent');
        setStep('reset');
    };

    const handleResetPassword = async () => {
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('password_mismatch');
            return;
        }

        setIsLoading(true);
        const result = await resetPassword(loginId, code, newPassword);
        setIsLoading(false);

        if (!result.success) {
            setError(result.error);
            return;
        }

        setInfo('password_reset');
        setStep('done');
    };

    const errorMessage = error
        ? t(`auth.forgotPassword.errors.${error}`, { defaultValue: t('auth.forgotPassword.errors.reset_failed') })
        : null;

    const infoMessage = info
        ? t(`auth.forgotPassword.${info}`)
        : null;

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('auth.forgotPassword.title')}</Text>
                        <TouchableOpacity onPress={handleClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                            <Ionicons name="close" size={scale(26)} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {step === 'request' && (
                        <>
                            <Text style={styles.description}>{t('auth.forgotPassword.requestDescription')}</Text>
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
                                editable={!isLoading}
                            />
                            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                            <TouchableOpacity
                                style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
                                onPress={handleRequestCode}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.primaryButtonText}>{t('auth.forgotPassword.sendCode')}</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 'reset' && (
                        <>
                            {infoMessage ? <Text style={styles.info}>{infoMessage}</Text> : null}
                            <Text style={styles.label}>{t('auth.forgotPassword.code')}</Text>
                            <TextInput
                                style={styles.input}
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                maxLength={6}
                                placeholder={t('auth.forgotPassword.codePlaceholder')}
                                placeholderTextColor={COLORS.textSecondary}
                                editable={!isLoading}
                            />
                            <Text style={styles.label}>{t('auth.forgotPassword.newPassword')}</Text>
                            <View style={styles.passwordRow}>
                                <TextInput
                                    style={[styles.input, styles.passwordInput]}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    placeholder={t('auth.forgotPassword.newPasswordPlaceholder')}
                                    placeholderTextColor={COLORS.textSecondary}
                                    editable={!isLoading}
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
                            <Text style={styles.label}>{t('auth.forgotPassword.confirmPassword')}</Text>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                placeholder={t('auth.forgotPassword.confirmPasswordPlaceholder')}
                                placeholderTextColor={COLORS.textSecondary}
                                editable={!isLoading}
                                onSubmitEditing={handleResetPassword}
                            />
                            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                            <TouchableOpacity
                                style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
                                onPress={handleResetPassword}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.primaryButtonText}>{t('auth.forgotPassword.resetPassword')}</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.linkButton} onPress={() => { setStep('request'); setError(null); }}>
                                <Text style={styles.linkText}>{t('auth.forgotPassword.resendCode')}</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 'done' && (
                        <>
                            <Text style={styles.info}>{infoMessage}</Text>
                            <TouchableOpacity style={styles.primaryButton} onPress={handleClose}>
                                <Text style={styles.primaryButtonText}>{t('auth.forgotPassword.backToLogin')}</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
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
        marginBottom: scale(12),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: '700',
        color: COLORS.text,
    },
    description: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
        marginBottom: scale(12),
        lineHeight: moderateScale(20),
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
    info: {
        color: COLORS.primary,
        fontSize: moderateScale(14),
        marginBottom: scale(12),
        lineHeight: moderateScale(20),
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: scale(10),
        paddingVertical: scale(14),
        alignItems: 'center',
        marginTop: scale(20),
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
    linkButton: {
        alignItems: 'center',
        marginTop: scale(14),
    },
    linkText: {
        color: COLORS.primary,
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
});

export default ForgotPasswordModal;
