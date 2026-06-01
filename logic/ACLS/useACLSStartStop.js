import { useCPRTimerStore } from '../../stores/timerStore';
import {useHistoryStore} from "../../stores/historyStore";
import {useRhythmStore} from "../../stores/rhythmStore";
import {useInterventionStore} from "../../stores/interventionStore";
import audioController  from "../audio/audioController";
import { HistoryCaller, HistoryAction } from '../../constants/history/historyConstants';



export const useACLSStartStop =   ()  => {
    const { playOnce } = audioController();
    const {  startArrestTimer , resetAllTimers } = useCPRTimerStore.getState();
    const logUserAction = useHistoryStore((state) => state.logUserAction);
    const resetHistory = useHistoryStore((state) => state.resetHistory);
    const resetInterventionsHistory = useInterventionStore((state) => state.resetAllInterventions);
    const setSelectedRhythm = useRhythmStore((state) => state.setSelectedRhythm);

    const handleStart = async () => {
        startArrestTimer();
        logUserAction(HistoryAction.ARREST_TIMER_STARTED, 'useACLSStartStop' ,'Arrest Timer Started');
       // await playOnce('startCPRImmediately');
       // await playOnce('selectRhythm');
    };

    const handleStop = (reason) => {
        logUserAction(HistoryAction.ACLS_PROCESS_END,'useACLSStartStop' , 'Stop Reason: ' + reason.id + ' - ' + reason.label, );
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