import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import audioFiles from './audioProvider';
import useAudioStore from '../../stores/useAudioStore';

let audioModeConfigured = false;

const ensureAudioMode = async () => {
    if (audioModeConfigured) return;
    await setAudioModeAsync({ playsInSilentMode: true });
    audioModeConfigured = true;
};

export default function audioController() {
    const playOnce = async (key) => {
        if (!audioFiles[key]) {
            console.warn(`Audio key "${key}" not found.`);
            return;
        }

        await ensureAudioMode();

        return new Promise((resolve) => {
            const player = createAudioPlayer(audioFiles[key]);
            const subscription = player.addListener('playbackStatusUpdate', (status) => {
                if (status.didJustFinish) {
                    subscription.remove();
                    player.remove();
                    resolve();
                }
            });
            player.play();
        });
    };

    const playLoop = async (key) => {
        if (!audioFiles[key]) {
            console.warn(`Audio key "${key}" not found.`);
            return;
        }

        await ensureAudioMode();

        const { getSoundRef, setSoundRef } = useAudioStore.getState();
        if (getSoundRef(key)) return;

        const player = createAudioPlayer(audioFiles[key]);
        player.loop = true;
        player.play();
        setSoundRef(key, player);
    };

    const stop = async (key) => {
        const { getSoundRef, removeSoundRef } = useAudioStore.getState();
        const player = getSoundRef(key);
        if (player) {
            player.pause();
            player.loop = false;
            player.remove();
            removeSoundRef(key);
        }
    };

    const isPlaying = async (key) => {
        const { getSoundRef } = useAudioStore.getState();
        const player = getSoundRef(key);
        return Boolean(player?.playing);
    };

    return {
        playOnce,
        playLoop,
        stop,
        isPlaying,
    };
}
