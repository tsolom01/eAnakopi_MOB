import { recordActualIntervention } from './interventionRecording';

/** Returns a handler that records user-tapped interventions when timers allow it. */
export const useHandleActualIntervention = () => {
    return (intervention, manualUserInterventionText = 'NA') => {
        recordActualIntervention(intervention, {
            manualText: manualUserInterventionText,
            caller: 'ActualInterventionsPanel',
        });
    };
};
