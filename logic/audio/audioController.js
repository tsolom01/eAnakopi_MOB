
import { Audio } from 'expo-av';
import audioFiles from './audioProvider';
import useAudioStore from '../../stores/useAudioStore';

export default function audioController() {
    // Store looping sounds

    const soundRefs = {};
    // Play a sound once
    const playOnce = async (key) => {
        return new Promise(async (resolve) => {
            if (!audioFiles[key]) {
                console.warn(`Audio key "${key}" not found.`);
                return;
            }

            const {sound} = await Audio.Sound.createAsync(audioFiles[key]);
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                    resolve();
                }
            });
        });
    };

    // Play a sound in loop
    const playLoop = async (key) => {
        if (!audioFiles[key]) {
            console.warn(`Audio key "${key}" not found.`);
            return;
        }
        const { getSoundRef, setSoundRef } = useAudioStore.getState();
        if (getSoundRef(key)) return;

        const { sound } = await Audio.Sound.createAsync(audioFiles[key], {
            isLooping: true,
            shouldPlay: true,
        });

        setSoundRef(key, sound);
    };

    // Stop and unload a looping sound
    const stop = async (key) => {
        const { getSoundRef, removeSoundRef } = useAudioStore.getState();
        const sound = getSoundRef(key);
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            removeSoundRef(key);
        }
    };

    const isPlaying = async (key) => {
        const { getSoundRef } = useAudioStore.getState();
        const sound = getSoundRef(key);
        if (!sound)         return false;

        try {
            const status = await sound.getStatusAsync();
            return status.isPlaying;
        } catch (err) {
            console.error('Error getting sound status:', err);
            return false;
        }
    };


    return {
        playOnce,
        playLoop,
        stop,
        isPlaying,
    };
}
