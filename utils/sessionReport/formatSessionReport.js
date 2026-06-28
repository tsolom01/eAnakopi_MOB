import { HistoryAction } from '../../constants/history/historyConstants';
import { interventions } from '../../constants/interventions';
import { secondsToTimeHHMMSS, secondsToTimeMMSS } from '../formatTime';

const ACTION_LABEL_KEYS = {
    [HistoryAction.ACLS_PROCESS_END]: 'sessionReport.actions.processEnd',
    [HistoryAction.CPR_TIMER_STARTED]: 'sessionReport.actions.cprStarted',
    [HistoryAction.ARREST_TIMER_STARTED]: 'sessionReport.actions.arrestStarted',
    [HistoryAction.INTERVENTION]: 'sessionReport.actions.intervention',
    [HistoryAction.RHYTHM_SELECTED]: 'sessionReport.actions.rhythmSelected',
    [HistoryAction.ROSC_DECLARED]: 'sessionReport.actions.roscDeclared',
};

function getInterventionLabel(id, t) {
    const key = `intervention.${id}.label`;
    return t(key, { defaultValue: id });
}

function getRhythmLabel(id, t) {
    const key = `rhythms.${id}.label`;
    return t(key, { defaultValue: id });
}

function formatLocaleDateTime(iso, language) {
    try {
        return new Date(iso).toLocaleString(language === 'gr' ? 'el-GR' : 'en-GB', {
            dateStyle: 'medium',
            timeStyle: 'medium',
        });
    } catch {
        return iso;
    }
}

function getActionLabel(action, t) {
    const key = ACTION_LABEL_KEYS[action];
    return key ? t(key) : action;
}

function describeEvent(event, t, endReasonId) {
    const { comment, action } = event;

    if (action === HistoryAction.ACLS_PROCESS_END) {
        const outcome = t(`end_reason.${endReasonId}.label`, { defaultValue: endReasonId });
        return t('sessionReport.processEndDetail', { outcome });
    }

    if (action === HistoryAction.RHYTHM_SELECTED) {
        const rhythmId = comment?.match(/Rhythm Selected:\s*(\w+)/i)?.[1];
        const rhythm = rhythmId ? getRhythmLabel(rhythmId, t) : comment;
        return t('sessionReport.rhythmSelectedDetail', { rhythm });
    }

    if (action === HistoryAction.INTERVENTION) {
        const actualMatch = comment?.match(/Actual intervention:\s*(\w+)/i);
        if (actualMatch) {
            return t('sessionReport.interventionActual', {
                name: getInterventionLabel(actualMatch[1], t),
            });
        }

        const proposedMatch = comment?.match(/Proposed intervention:\s*(\w+)/i);
        if (proposedMatch) {
            return t('sessionReport.interventionProposed', {
                name: getInterventionLabel(proposedMatch[1], t),
            });
        }

        const otherMatch = comment?.match(/Intervention User Input:\s*(.+?)\s*\./i);
        if (otherMatch) {
            return t('sessionReport.interventionOther', { name: otherMatch[1].trim() });
        }
    }

    if (action === HistoryAction.ROSC_DECLARED) {
        return t('sessionReport.roscDetail');
    }

    if (action === HistoryAction.ARREST_TIMER_STARTED) {
        return t('sessionReport.arrestStartedDetail');
    }

    if (action === HistoryAction.CPR_TIMER_STARTED) {
        return t('sessionReport.cprStartedDetail');
    }

    return comment || '';
}

export function buildSessionReport({ endReasonId, eventLog, submittedAt, username }, t, language = 'en') {
    const lastEvent = eventLog[eventLog.length - 1] ?? {};

    const interventionSummary = interventions
        .map(({ id }) => {
            const counts = lastEvent.interventionCounters?.[id] ?? { proposed: 0, actual: 0 };
            if (!counts.proposed && !counts.actual) return null;

            return {
                id,
                label: getInterventionLabel(id, t),
                proposed: counts.proposed,
                actual: counts.actual,
            };
        })
        .filter(Boolean);

    const timeline = eventLog.map((event, index) => ({
        id: `${event.timestamp}-${index}`,
        time: formatLocaleDateTime(event.timestamp, language),
        arrestTime: secondsToTimeHHMMSS(event.arrestTimer ?? 0),
        cprTime: secondsToTimeMMSS(event.cprTimer ?? 0),
        cycle: event.cyclesCounter ?? 0,
        rhythm: event.currentRhythm ? getRhythmLabel(event.currentRhythm, t) : null,
        actionLabel: getActionLabel(event.action, t),
        detail: describeEvent(event, t, endReasonId),
        caller: event.type === 'system' ? t('sessionReport.callerSystem') : t('sessionReport.callerUser'),
    }));

    return {
        summary: {
            endReasonLabel: t(`end_reason.${endReasonId}.label`, { defaultValue: endReasonId }),
            submittedAt: formatLocaleDateTime(submittedAt, language),
            username,
            arrestDuration: secondsToTimeHHMMSS(lastEvent.arrestTimer ?? 0),
            cycles: lastEvent.cyclesCounter ?? 0,
            eventCount: eventLog.length,
        },
        interventions: interventionSummary,
        timeline,
    };
}
