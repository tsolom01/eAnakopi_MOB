import { useInterventionStore } from '../../stores/interventionStore';
import { useCPRTimerStore } from '../../stores/timerStore';
import {useHistoryStore} from "../../stores/historyStore";
import {useCurrentACLSContext} from "../ACLS/useCurrentACLSContext";


export const useHandleActualIntervention= (id) => {
   // const { incrementInterventionCounter } = useInterventionStore.getState();
    const isCPRTimerRunning = useCPRTimerStore((state) => state.isCPRTimerRunning);
    const isArrestTimerRunning = useCPRTimerStore((state) => state.isArrestTimerRunning);
    const addToHistory = useHistoryStore((state) => state.addToHistory);
    const { recordIntervention } = useInterventionStore.getState();
    const snapshotFunction = useCurrentACLSContext();

    return (intervention,manualUserInterventionText ='NA') => {

        if (isArrestTimerRunning) {

            if (intervention.requiresActiveCPR) {
                //console.log('Intervention: ' + intervention.id + intervention.requiresActiveCPR + isCPRTimerRunning);
                if (isCPRTimerRunning) {
     //               incrementInterventionCounter(intervention.id, 'actual');
                    recordIntervention(intervention.id,manualUserInterventionText, 'actual', snapshotFunction('intervention','intervention','useHandleActualIntervention','Actual Intervention : ' + intervention.id + ' !' ));
                    addToHistory('useHandleActualIntervention', 'InterventionCounter ' + intervention.id + ' increased by 1');
                }
            }
            else {
    //                incrementInterventionCounter(intervention.id, 'actual');
                    recordIntervention(intervention.id,manualUserInterventionText, 'actual', snapshotFunction('intervention','intervention','useHandleActualIntervention','Actual Intervention : ' + intervention.id + ' !' ));
                    addToHistory('useHandleActualIntervention', 'InterventionCounter ' + intervention.id + ' increased by 1');

            }
        }
    };


};