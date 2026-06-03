import React, { useEffect, useState } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Switch,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import audioController from '../../../../logic/audio/audioController';
import { useCPRTimerStore } from '../../../../stores/timerStore';
import { ModalScreenHeader } from '../../../common/ModalScreenHeader';
import { scale } from '../../../../utils/scale';
import { COLORS } from '../../../../styles/layout';

const SettingsModal = ({ visible, onClose }) => {
    const { t, i18n } = useTranslation();
    const { playLoop, stop, isPlaying } = audioController();
    const constCPRTimer = useCPRTimerStore((state) => state.constCPRTimer);
    const updateConstCPRTimer = useCPRTimerStore((state) => state.updateConstCPRTimer);
    const [heartbeatOn, setHeartbeatOn] = useState(false);
    const [timerInput, setTimerInput] = useState(String(constCPRTimer));
    const [timerSaved, setTimerSaved] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            const playing = await isPlaying('heartbeat');
            setHeartbeatOn(playing);
        };
        if (visible) {
            checkStatus();
            setTimerInput(String(constCPRTimer));
            setTimerSaved(false);
        }
    }, [visible, constCPRTimer]);

    const applyNewTimer = () => {
        const parsed = parseInt(timerInput, 10);
        if (!isNaN(parsed) && parsed > 0) {
            updateConstCPRTimer(parsed);
            setTimerSaved(true);
            setTimeout(() => setTimerSaved(false), 2000);
        }
    };

    const onHeartbeatToggle = async (value) => {
        if (value) {
            await playLoop('heartbeat');
        } else {
            await stop('heartbeat');
        }
        setHeartbeatOn(value);
    };

    const languages = [
        { code: 'en', labelKey: 'english' },
        { code: 'gr', labelKey: 'greek' },
    ];

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <SafeAreaView style={styles.safeArea}>
                <ModalScreenHeader title={t('settings')} onBack={onClose} />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={styles.rowText}>
                                <Text style={styles.label}>{t('enableHeartbeat')}</Text>
                            </View>
                            <Switch
                                value={heartbeatOn}
                                onValueChange={onHeartbeatToggle}
                                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
                                thumbColor="#FFFFFF"
                            />
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionLabel}>{t('settingModal.cprCycleDuration')}</Text>
                        <View style={styles.cprRow}>
                            <TextInput
                                style={styles.input}
                                value={timerInput}
                                onChangeText={setTimerInput}
                                keyboardType="number-pad"
                                placeholder="120"
                                placeholderTextColor={COLORS.textSecondary}
                            />
                            <TouchableOpacity
                                style={[styles.applyButton, timerSaved && styles.applyButtonSuccess]}
                                onPress={applyNewTimer}
                                accessibilityRole="button"
                                accessibilityLabel={t('apply')}
                            >
                                <Ionicons
                                    name={timerSaved ? 'checkmark-circle' : 'checkmark-circle-outline'}
                                    size={scale(36)}
                                    color={timerSaved ? COLORS.primary : COLORS.accent}
                                />
                            </TouchableOpacity>
                        </View>
                        {timerSaved ? (
                            <Text style={styles.savedHint}>{t('settingsSaved')}</Text>
                        ) : null}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionLabel}>{t('language')}</Text>
                        <View style={styles.languageRow}>
                            {languages.map(({ code, labelKey }) => {
                                const selected = i18n.language === code;
                                return (
                                    <TouchableOpacity
                                        key={code}
                                        style={[styles.langOption, selected && styles.langOptionSelected]}
                                        onPress={() => i18n.changeLanguage(code)}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[
                                                styles.langOptionText,
                                                selected && styles.langOptionTextSelected,
                                            ]}
                                        >
                                            {t(labelKey)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: scale(16),
        paddingBottom: scale(32),
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: scale(12),
        padding: scale(16),
        marginBottom: scale(14),
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowText: {
        flex: 1,
        paddingRight: scale(12),
    },
    label: {
        fontSize: scale(16),
        fontWeight: '600',
        color: COLORS.text,
    },
    sectionLabel: {
        fontSize: scale(14),
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: scale(12),
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cprRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
    },
    input: {
        flex: 1,
        height: scale(48),
        paddingHorizontal: scale(14),
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: scale(10),
        backgroundColor: COLORS.background,
        fontSize: scale(18),
        color: COLORS.text,
        fontWeight: '600',
    },
    applyButton: {
        width: scale(48),
        height: scale(48),
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonSuccess: {
        opacity: 1,
    },
    savedHint: {
        marginTop: scale(8),
        fontSize: scale(13),
        color: COLORS.primary,
        fontWeight: '600',
    },
    languageRow: {
        flexDirection: 'row',
        gap: scale(10),
    },
    langOption: {
        flex: 1,
        paddingVertical: scale(14),
        borderRadius: scale(10),
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    langOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F8EF',
    },
    langOptionText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    langOptionTextSelected: {
        color: COLORS.primaryDark,
    },
});

export default SettingsModal;
