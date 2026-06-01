import { useCPRTimerStore } from '../../stores/timerStore';
import {useHistoryStore} from "../../stores/historyStore";
import { HistoryAction } from '../../constants/history/historyConstants';

export const useHandleROSCDeclaration =   ()  => {
    const {  stopCPRTimer, resetCPRTimer } = useCPRTimerStore.getState();
    const logUserAction = useHistoryStore((state) => state.logUserAction);

    const handleNO = async () => {
    };

    const handleROSC =  async () => {
        logUserAction(HistoryAction.ROSC_DECLARED,'useHandleROSCDeclaration' , 'ROSC Declared CPRTimer will be stopped and reset' );
        stopCPRTimer();
        resetCPRTimer(false);
    };

    return {
        handleROSC,
        handleNO,
    };
};