import audioController  from "../audio/audioController";
import { recordProposedIntervention } from './interventionRecording';


export const whenShockHappens = async (rhythm, shockCount) => {
    const { playOnce } = audioController();

    if (!rhythm?.onConsecutiveShocks) return;


    for (const action of rhythm.onConsecutiveShocks) {
        const { shockNumbers, intervention, sound, text } = action;

        const shouldTrigger = Array.isArray(shockNumbers) && shockNumbers.includes(shockCount + 1);

        if (!shouldTrigger) continue;



        if (sound) {
            await playOnce(sound);
        }

        if (intervention) {
            recordProposedIntervention(intervention, { caller: 'whenShockHappens' });
        }

        if (text) {
            console.log('Shock Text:', text); // Optionally show in UI
        }
    }
};