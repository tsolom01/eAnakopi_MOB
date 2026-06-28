import React, { useMemo } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { ModalScreenHeader } from '../common/ModalScreenHeader';
import { useSessionReportStore } from '../../stores/sessionReportStore';
import { buildSessionReport } from '../../utils/sessionReport/formatSessionReport';
import { scale } from '../../utils/scale';
import { COLORS } from '../../styles/layout';

const SummaryRow = ({ label, value }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
    </View>
);

const SessionReportModal = () => {
    const { t, i18n } = useTranslation();
    const visible = useSessionReportStore((state) => state.visible);
    const rawReport = useSessionReportStore((state) => state.report);
    const dismissReport = useSessionReportStore((state) => state.dismissReport);

    const report = useMemo(() => {
        if (!rawReport) return null;
        return buildSessionReport(rawReport, t, i18n.language);
    }, [rawReport, t, i18n.language]);

    if (!visible || !report) return null;

    return (
        <Modal visible animationType="slide" onRequestClose={dismissReport}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
                <StatusBar barStyle="dark-content" />
                <ModalScreenHeader title={t('sessionReport.title')} onBack={dismissReport} />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.notice}>
                        <Ionicons name="checkmark-circle" size={scale(20)} color={COLORS.primaryDark} />
                        <Text style={styles.noticeText}>{t('sessionReport.savedSuccess')}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>{t('sessionReport.summary')}</Text>
                    <View style={styles.card}>
                        <SummaryRow label={t('sessionReport.outcome')} value={report.summary.endReasonLabel} />
                        <SummaryRow label={t('sessionReport.date')} value={report.summary.submittedAt} />
                        <SummaryRow label={t('sessionReport.responder')} value={report.summary.username} />
                        <SummaryRow
                            label={t('sessionReport.arrestDuration')}
                            value={report.summary.arrestDuration}
                        />
                        <SummaryRow label={t('sessionReport.cycles')} value={String(report.summary.cycles)} />
                        <SummaryRow label={t('sessionReport.events')} value={String(report.summary.eventCount)} />
                    </View>

                    {report.interventions.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>{t('sessionReport.interventions')}</Text>
                            <View style={styles.card}>
                                {report.interventions.map((item) => (
                                    <View key={item.id} style={styles.interventionRow}>
                                        <Text style={styles.interventionLabel}>{item.label}</Text>
                                        <View style={styles.interventionCounts}>
                                            {item.actual > 0 && (
                                                <Text style={styles.interventionActual}>
                                                    {t('sessionReport.actual')}: {item.actual}
                                                </Text>
                                            )}
                                            {item.proposed > 0 && (
                                                <Text style={styles.interventionProposed}>
                                                    {t('sessionReport.proposed')}: {item.proposed}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                    <Text style={styles.sectionTitle}>{t('sessionReport.timeline')}</Text>
                    <View style={styles.card}>
                        {report.timeline.map((event, index) => (
                            <View
                                key={event.id}
                                style={[styles.timelineItem, index < report.timeline.length - 1 && styles.timelineBorder]}
                            >
                                <View style={styles.timelineHeader}>
                                    <Text style={styles.timelineAction}>{event.actionLabel}</Text>
                                    <Text style={styles.timelineTime}>{event.time}</Text>
                                </View>
                                {event.detail ? <Text style={styles.timelineDetail}>{event.detail}</Text> : null}
                                <View style={styles.timelineMeta}>
                                    <Text style={styles.timelineMetaText}>
                                        {t('sessionReport.arrestTime')}: {event.arrestTime}
                                    </Text>
                                    {event.cycle > 0 && (
                                        <Text style={styles.timelineMetaText}>
                                            {t('sessionReport.cycle')}: {event.cycle}
                                        </Text>
                                    )}
                                    {event.rhythm && (
                                        <Text style={styles.timelineMetaText}>
                                            {t('sessionReport.rhythm')}: {event.rhythm}
                                        </Text>
                                    )}
                                    <Text style={styles.timelineMetaText}>{event.caller}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.viewOnlyNotice}>{t('sessionReport.viewOnlyNotice')}</Text>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.closeButton} onPress={dismissReport} activeOpacity={0.8}>
                        <Text style={styles.closeButtonText}>{t('sessionReport.close')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: scale(16),
        paddingBottom: scale(16),
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        backgroundColor: '#E8F8EF',
        borderRadius: scale(10),
        padding: scale(12),
        marginTop: scale(12),
        marginBottom: scale(4),
    },
    noticeText: {
        flex: 1,
        color: COLORS.primaryDark,
        fontSize: scale(14),
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: scale(16),
        fontWeight: '700',
        color: COLORS.text,
        marginTop: scale(20),
        marginBottom: scale(8),
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: scale(12),
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: scale(14),
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: scale(6),
        gap: scale(12),
    },
    summaryLabel: {
        flex: 1,
        fontSize: scale(14),
        color: COLORS.textSecondary,
    },
    summaryValue: {
        flex: 1.2,
        fontSize: scale(14),
        fontWeight: '600',
        color: COLORS.text,
        textAlign: 'right',
    },
    interventionRow: {
        paddingVertical: scale(8),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    interventionLabel: {
        fontSize: scale(15),
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: scale(4),
    },
    interventionCounts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(12),
    },
    interventionActual: {
        fontSize: scale(13),
        color: COLORS.primaryDark,
        fontWeight: '600',
    },
    interventionProposed: {
        fontSize: scale(13),
        color: COLORS.textSecondary,
    },
    timelineItem: {
        paddingVertical: scale(10),
    },
    timelineBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    timelineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: scale(8),
        marginBottom: scale(4),
    },
    timelineAction: {
        flex: 1,
        fontSize: scale(14),
        fontWeight: '700',
        color: COLORS.text,
    },
    timelineTime: {
        fontSize: scale(12),
        color: COLORS.textSecondary,
    },
    timelineDetail: {
        fontSize: scale(14),
        color: COLORS.text,
        marginBottom: scale(6),
    },
    timelineMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(8),
    },
    timelineMetaText: {
        fontSize: scale(12),
        color: COLORS.textSecondary,
    },
    viewOnlyNotice: {
        textAlign: 'center',
        fontSize: scale(12),
        color: COLORS.textSecondary,
        marginTop: scale(20),
        marginBottom: scale(8),
        lineHeight: scale(18),
    },
    footer: {
        paddingHorizontal: scale(16),
        paddingVertical: scale(12),
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    closeButton: {
        backgroundColor: COLORS.headerBg,
        borderRadius: scale(10),
        paddingVertical: scale(14),
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: '700',
    },
});

export default SessionReportModal;
