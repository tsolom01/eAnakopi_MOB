import { useCPRTimerStore } from '../../stores/timerStore';
import { useHistoryStore } from '../../stores/historyStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import { useInterventionStore } from '../../stores/interventionStore';
import { useAuthStore } from '../../stores/authStore';
import { useSessionReportStore } from '../../stores/sessionReportStore';
import { HistoryAction } from '../../constants/history/historyConstants';

export const useACLSStartStop = () => {
    const { startArrestTimer, resetAllTimers } = useCPRTimerStore.getState();
    const logUserAction = useHistoryStore((state) => state.logUserAction);
    const resetHistory = useHistoryStore((state) => state.resetHistory);
    const resetInterventionsHistory = useInterventionStore((state) => state.resetAllInterventions);
    const setSelectedRhythm = useRhythmStore((state) => state.setSelectedRhythm);

    const handleStart = async () => {
        startArrestTimer();
        logUserAction(HistoryAction.ARREST_TIMER_STARTED, 'useACLSStartStop', 'Arrest Timer Started');
    };

    const handleStop = async (reason) => {
        logUserAction(
            HistoryAction.ACLS_PROCESS_END,
            'useACLSStartStop',
            'Stop Reason: ' + reason.id + ' - ' + reason.label
        );

        const { history } = useHistoryStore.getState();
        const { isAuthenticated, username, uploadSessionHistory } = useAuthStore.getState();

        if (isAuthenticated) {
            const result = await uploadSessionHistory({
                endReasonId: reason.id,
                eventLog: history,
            });

            if (result.success) {
                useSessionReportStore.getState().showReport({
                    endReasonId: reason.id,
                    eventLog: [...history],
                    submittedAt: result.data?.submittedAt ?? new Date().toISOString(),
                    username,
                    recordId: result.data?.id,
                });

                if (__DEV__) {
                    console.log('[history] uploaded:', result.data?.id);
                }
            } else if (__DEV__) {
                console.warn('[history] upload failed:', result.error);
            }
        }

        resetAllTimers();
        setSelectedRhythm(null);
        resetInterventionsHistory();
        resetHistory();
    };

    return {
        handleStart,
        handleStop,
    };
};
