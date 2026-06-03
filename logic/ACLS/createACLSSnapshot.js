import { useCPRTimerStore } from '../../stores/timerStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import { useInterventionStore } from '../../stores/interventionStore';

/** Captures timer, rhythm, and intervention state at call time (not a React hook). */
export const createACLSSnapshot = (type, action, calledFrom, comment) => {
    const { arrestTimer, cprTimer, cyclesCounter } = useCPRTimerStore.getState();
    const currentRhythm = useRhythmStore.getState().selectedRhythm;
    const interventionCounters = useInterventionStore.getState().interventionCounters;

    return {
        type,
        action,
        timestamp: new Date().toISOString(),
        arrestTimer,
        cprTimer,
        cyclesCounter,
        currentRhythm: currentRhythm?.id,
        interventionCounters,
        comment,
        calledFrom,
    };
};
