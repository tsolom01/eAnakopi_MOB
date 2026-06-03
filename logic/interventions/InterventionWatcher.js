import { useEffect } from 'react';
import { useCPRTimerStore } from '../../stores/timerStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import { whenRhythmSelected } from './whenRhytmSelected';
import { useInterventionStore } from '../../stores/interventionStore';

export const InterventionWatcher = () => {
    const cycleCounter = useCPRTimerStore((state) => state.cyclesCounter);
    const  selectedRhythm = useRhythmStore((state) => state.selectedRhythm);
    const  selectionRhythmVersion = useRhythmStore((state) => state.selectionVersion);
    const resetCounter = useInterventionStore((state) => state.resetCounter);
    const { getInterventionCounter } = useInterventionStore.getState();


    useEffect(() => {
        if (selectedRhythm?.shockable === false) {
            resetCounter('consecutiveShock');
        }
        whenRhythmSelected(selectedRhythm,cycleCounter , getInterventionCounter('consecutiveShock','proposed'));
    }, [selectionRhythmVersion]);

    return null;
};