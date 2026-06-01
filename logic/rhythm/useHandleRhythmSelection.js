import { useCPRTimerStore } from '../../stores/timerStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import {useHistoryStore} from "../../stores/historyStore";
import {  HistoryAction } from '../../constants/history/historyConstants';

export const useHandleRhythmSelection = (rhythmId) => {
    const { isCPRTimerRunning, startCPRTimer } = useCPRTimerStore.getState();
    const { setSelectedRhythm  } = useRhythmStore.getState();
    const logUserAction = useHistoryStore((state) => state.logUserAction);

    return (rhythm) => {
        setSelectedRhythm(rhythm);
        logUserAction(HistoryAction.RHYTHM_SELECTED,'useHandleRhythmSelection','Rhythm Selected: ' + rhythm.id);
    };


};