import {useInterventionStore} from "../../stores/interventionStore";
import {useCurrentACLSContext} from "../ACLS/useCurrentACLSContext";
import {useHistoryStore} from "../../stores/historyStore";
import {HistoryAction} from "../../constants/history/historyConstants";

export const handleIntervention = (intervention , caller='' , ) => {
    const { recordIntervention ,incrementInterventionCounter,interventionCounters} = useInterventionStore.getState();
    const snapshotFunction = useCurrentACLSContext();
    const { logSystemAction } = useHistoryStore.getState();

    // Record intervention
    //incrementInterventionCounter(intervention, 'proposed');
    recordIntervention(intervention,'NA', 'proposed', snapshotFunction('intervention','intervention','handleIntervention (' + caller +')','Proposed' + intervention.id + ' Intervention' ));
    logSystemAction(HistoryAction.INTERVENTION,'triggerIntervention', 'Intervention: ' + intervention + ' triggered');
};