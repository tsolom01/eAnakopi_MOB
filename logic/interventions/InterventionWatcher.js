import { useEffect } from 'react';
import { useCPRTimerStore } from '../../stores/timerStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import { whenRhythmSelected } from './whenRhytmSelected';
import { useInterventionStore } from '../../stores/interventionStore';
//import { whenCycleChanges } from './whenCycleChanges';

export const InterventionWatcher =  () => {
    const arrestTimer = useCPRTimerStore((state) => state.arrestTimer);
    const cycleCounter = useCPRTimerStore((state) => state.cyclesCounter);
    const  selectedRhythm = useRhythmStore((state) => state.selectedRhythm);
    const  selectionRhythmVersion = useRhythmStore((state) => state.selectionVersion);
    const resetCounter = useInterventionStore((state) => state.resetCounter);
    const { getInterventionCounter } = useInterventionStore.getState();


   // useEffect(() => {
   //
   // }, [arrestTimer]);

    useEffect(() => {
        if (selectedRhythm?.shockable === false) {
            resetCounter('consecutiveShock');
        }
        whenRhythmSelected(selectedRhythm,cycleCounter , getInterventionCounter('consecutiveShock','proposed'));
    }, [selectionRhythmVersion]);


   // useEffect(() => {
   //     if (selectedRhythm) {
   //         whenCycleChanges(selectedRhythm, cycleCounter);
   //     }
   // }, [cycleCounter]);

    return null; // This component only runs logic, nothing to render
};