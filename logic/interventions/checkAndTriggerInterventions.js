import { interventionProvider } from '../../providers/interventionProvider';
import { useInterventionStore } from '../../stores/interventionStore';
import { useCPRTimerStore } from '../../stores/timerStore';
import { useRhythmStore } from '../../stores/rhythmStore';
import {useHistoryStore} from "../../stores/historyStore";
import {  HistoryAction } from '../../constants/history/historyConstants';
import audioController  from "../audio/audioController";

import {useCurrentACLSContext} from "../ACLS/useCurrentACLSContext";

export const checkAndTriggerInterventions = () => {
    const { arrestTimer, cyclesCounter } = useCPRTimerStore.getState();
    const { selectedRhythmId} = useRhythmStore.getState();
    const {
        interventionHistory,
        shockCount,
    } = useInterventionStore.getState();



    interventionProvider.forEach((intervention) => {
        // Check rhythm match
        if (!intervention.triggerable) return;
        if (!intervention.rhythmIndications.includes(selectedRhythmId)) return;

        const history = interventionHistory[intervention.id] || [];
        const lastTime = history[history.length - 1];

        const elapsedSinceLast = lastTime !== undefined ? arrestTimer - lastTime : null;

        // 1. Immediate first dose (shock or first med)



        if (history.length === 0 && intervention.ifFirstDoseImmediate) {
            triggerIntervention(intervention);
            return;
        }

        // 2. Cycle-based trigger (e.g., shock every 2 mins)
        if (intervention.triggerOnCycleChange && cyclesCounter > history.length) {
            triggerIntervention(intervention);
            return;
        }

        // 3. Time-based interventions

        if  (intervention.intervalSeconds) {
            if ( elapsedSinceLast == null &&  arrestTimer >= intervention.intervalSeconds) {
                triggerIntervention(intervention);
                return;
            }
            if ( elapsedSinceLast !== null &&  elapsedSinceLast >= intervention.intervalSeconds) {
                triggerIntervention(intervention, arrestTimer , cyclesCounter,selectedRhythmId);
                return;
            }
        }



        // 4. Shock-count based meds (e.g., amiodarone)
        if (
            intervention.triggerAfterShockCount?.includes(shockCount) &&
            history.includes(arrestTimer)
        ) {
            triggerIntervention(intervention);
        }
    });
};

const triggerIntervention = (intervention) => {
    const { recordIntervention ,incrementInterventionCounter,interventionCounters} = useInterventionStore.getState();
    const snapshotFunction = useCurrentACLSContext();
    const { playOnce } = audioController();
    const { logSystemAction } = useHistoryStore.getState();


    // Record intervention
    incrementInterventionCounter(intervention.id, 'proposed');
    recordIntervention(intervention.id, 'proposed', snapshotFunction('intervention','checkAndTriggerInterventions','Proposed' + intervention.id + ' Intervention' ));
    logSystemAction(HistoryAction.INTERVENTION,'triggerIntervention', 'Intervention: ' + intervention.id + ' triggered');
    //console.log(data, interventionCounters);

    // Get the history length (number of times intervention has been given)
    const interventionHistory = useInterventionStore.getState().interventionHistory;
    const historyLength = (interventionHistory[intervention.id] || []).length;

    // Select notification based on how many times intervention triggered
    const notifications = intervention.notifications || [];
    // Use last notification if historyLength > notifications.length
    const notificationIndex = Math.min(historyLength - 1, notifications.length - 1);
    const notification = notifications[notificationIndex] || {};

    // Trigger notifications
    console.log(intervention.id, 'intervention triggered');
    if (notification.sound) { playOnce(notification.sound) };
    if (notification.text) {
        console.log(`ALERT: ${notification.text}`);
    }
    if (notification.vibration) {
        console.log('VIBRATE!');
    }
};