import audioController  from "../audio/audioController";
import  {handleIntervention} from "./handleIntervention"
import {useInterventionStore} from "../../stores/interventionStore";


export const whenCycleChanges = async (rhythm, cycle) => {
    const { playOnce } = audioController();
    const lastCycleAdrenalineGiven = useInterventionStore.getState().lastCycleAdrenalineGiven;
    const setLastCycleAdrenalineGiven = useInterventionStore.getState().setLastCycleAdrenalineGiven;

    const shouldGiveAdrenaline=(action) =>
    {
        if (lastCycleAdrenalineGiven === -1) return true;
        return  (cycle - lastCycleAdrenalineGiven) > action.minCycleGap;
    }


    // Helper to decide if an action should trigger
    const shouldTriggerAction = (action, cycle) => {
        // If startFromCycle defined, only start triggering from that cycle onward
        if (action.startFromCycle && cycle < action.startFromCycle) return false;
        // If onEveryCycle is true, always trigger (after startFromCycle)
        if (action.onEveryCycle) return true;

        if (action.intervention=== 'adrenaline'){
            if (shouldGiveAdrenaline(action)) {
                setLastCycleAdrenalineGiven( cycle);
                return true;
            }
            else return false;
        }
        // If none of the above blocks triggered, action is valid
        return true;
    };

    if (!rhythm?.onCycleChange) return;

    for (const action of rhythm.onCycleChange) {
        if (!shouldTriggerAction(action, cycle)) continue;


        if (action.sound) {
            await playOnce(action.sound);
        }

        if (action.intervention) {
            handleIntervention(action.intervention, 'cycleChange');
        }

        if (action.text) {
            console.log('Action text:', action.text); // Replace with UI logic if needed
        }
    }
};