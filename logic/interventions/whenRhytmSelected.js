import audioController  from "../audio/audioController";
import  {handleIntervention} from "./handleIntervention"
import { whenCycleChanges } from './whenCycleChanges';
import {whenShockHappens} from "./whenShockHappens";


export const whenRhythmSelected = async (rhythm,cycleCounter,proposedShocks) => {
    const { playOnce } = audioController();

   // if (!rhythm?.onSelect) return;
    //console.log('rhythm?.onSelect' + rhythm?.onSelect);
    if (rhythm?.onSelect)
        for (const action of rhythm.onSelect) {
            if (action.sound) {
                await playOnce(action.sound);
            }
            if (action.intervention) {
                handleIntervention(action.intervention);
            }
        }
    const handleCycleAndShock = async () => {
        await whenCycleChanges(rhythm, cycleCounter); // ✅ wait for this to finish
        await whenShockHappens(rhythm, proposedShocks); // ✅ then call this
    };
    await handleCycleAndShock();



};

