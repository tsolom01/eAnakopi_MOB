import React from 'react';
import { Modal, ScrollView, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ModalScreenHeader } from '../../../common/ModalScreenHeader';
import { scale } from '../../../../utils/scale';
import { COLORS } from '../../../../styles/layout';

const GUIDE_STEPS_EN = [
    'Press START to begin the arrest timer.',
    'Confirm cardiac arrest when ready — rhythm selection appears immediately.',
    'Follow the CPR cycle prompts (default 120 seconds per cycle).',
    'Select the appropriate rhythm at the end of each cycle.',
    'Use ROSC if spontaneous circulation returns.',
    'Press STOP and choose an outcome when resuscitation ends.',
];

const GUIDE_STEPS_GR = [
    'Πατήστε ΕΝΑΡΞΗ για να ξεκινήσετε το χρονόμετρο ανακοπής.',
    'Επιβεβαιώστε την καρδιακή ανακοπή — εμφανίζεται άμεσα η επιλογή ρυθμού.',
    'Ακολουθήστε τις οδηγίες του κύκλου CPR (προεπιλογή 120 δευτερόλεπτα).',
    'Επιλέξτε τον κατάλληλο ρυθμό στο τέλος κάθε κύκλου.',
    'Χρησιμοποιήστε ROSC εάν επανέλθει αυθόρμητη κυκλοφορία.',
    'Πατήστε ΔΙΑΚΟΠΗ και επιλέξτε αποτέλεσμα όταν ολοκληρωθεί η ανάνηψη.',
];

const GuidesModal = ({ visible, setShowGuidesModal }) => {
    const { t, i18n } = useTranslation();
    const steps = i18n.language === 'gr' ? GUIDE_STEPS_GR : GUIDE_STEPS_EN;

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={() => setShowGuidesModal(false)}>
            <SafeAreaView style={styles.safeArea}>
                <ModalScreenHeader title={t('guides')} onBack={() => setShowGuidesModal(false)} />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.intro}>{t('guidesIntro')}</Text>

                    {steps.map((step, index) => (
                        <View key={index} style={styles.stepCard}>
                            <View style={styles.stepBadge}>
                                <Text style={styles.stepNumber}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
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
    intro: {
        fontSize: scale(15),
        color: COLORS.textSecondary,
        lineHeight: scale(22),
        marginBottom: scale(16),
    },
    stepCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: scale(12),
        padding: scale(14),
        marginBottom: scale(10),
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'flex-start',
    },
    stepBadge: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        backgroundColor: COLORS.headerBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(12),
        marginTop: scale(2),
    },
    stepNumber: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: scale(15),
    },
    stepText: {
        flex: 1,
        fontSize: scale(15),
        lineHeight: scale(22),
        color: COLORS.text,
    },
});

export default GuidesModal;
