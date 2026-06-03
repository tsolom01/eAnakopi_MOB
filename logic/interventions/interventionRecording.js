/**
 * Single entry point for recording proposed (system) and actual (user) interventions.
 *
 * Proposed interventions are driven by rhythm rules in whenRhythmSelected / whenCycleChanges /
 * whenShockHappens. The legacy checkAndTriggerInterventions module was removed: it was never
 * wired up, referenced non-existent store fields, and duplicated this flow.
 */
import { useInterventionStore } from '../../stores/interventionStore';
import { useCPRTimerStore } from '../../stores/timerStore';
import { useHistoryStore } from '../../stores/historyStore';
import { createACLSSnapshot } from '../ACLS/createACLSSnapshot';
import { HistoryAction } from '../../constants/history/historyConstants';
import { getInterventionById } from '../../constants/interventions';

export const resolveInterventionId = (interventionOrId) => {
    if (typeof interventionOrId === 'string') return interventionOrId;
    if (interventionOrId?.id) return interventionOrId.id;
    throw new Error('Invalid intervention identifier');
};

export const getInterventionConfig = (interventionOrId) => {
    if (typeof interventionOrId === 'object' && interventionOrId !== null) {
        return interventionOrId;
    }
    return getInterventionById(interventionOrId) ?? { id: interventionOrId };
};

export const canRecordActualIntervention = (interventionOrId) => {
    const config = getInterventionConfig(interventionOrId);
    const { isArrestTimerRunning, isCPRTimerRunning } = useCPRTimerStore.getState();

    if (!isArrestTimerRunning) return false;
    if (config.requiresActiveCPR && !isCPRTimerRunning) return false;
    return true;
};

export const recordProposedIntervention = (interventionOrId, options = {}) => {
    const { caller = 'system', manualText = 'NA', comment } = options;
    const id = resolveInterventionId(interventionOrId);
    const { recordIntervention } = useInterventionStore.getState();
    const { logSystemAction } = useHistoryStore.getState();

    recordIntervention(
        id,
        manualText,
        'proposed',
        createACLSSnapshot('intervention', 'intervention', caller, comment ?? `Proposed ${id} intervention`)
    );
    logSystemAction(HistoryAction.INTERVENTION, caller, `Proposed intervention: ${id}`);
};

export const recordActualIntervention = (interventionOrId, options = {}) => {
    if (!canRecordActualIntervention(interventionOrId)) return false;

    const { caller = 'ActualInterventionsPanel', manualText = 'NA', comment } = options;
    const id = resolveInterventionId(interventionOrId);
    const { recordIntervention } = useInterventionStore.getState();
    const { logUserAction } = useHistoryStore.getState();

    recordIntervention(
        id,
        manualText,
        'actual',
        createACLSSnapshot('intervention', 'intervention', caller, comment ?? `Actual intervention: ${id}`)
    );
    logUserAction(HistoryAction.INTERVENTION, caller, `Actual intervention: ${id}`);
    return true;
};
