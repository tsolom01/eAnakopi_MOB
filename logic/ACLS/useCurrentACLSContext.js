

import { useCPRTimerStore } from '../../stores/timerStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import { useInterventionStore } from '../../stores/interventionStore';

export const useCurrentACLSContext = () => {
    const { arrestTimer, cprTimer, cyclesCounter } = useCPRTimerStore.getState();
    const currentRhythm = useRhythmStore.getState().selectedRhythm;
    const interventionCounters = useInterventionStore.getState().interventionCounters;

    // Return a function that accepts additional metadata
    return ( type,action, calledFrom, comment) => ({
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
    });
};