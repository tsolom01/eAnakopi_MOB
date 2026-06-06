import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

let audioModeConfigured = false;

const ensureAudioMode = async () => {
    if (audioModeConfigured) return;
    await setAudioModeAsync({ playsInSilentMode: true });
    audioModeConfigured = true;
};

export const playAudio = (soundFile, shouldLoop = false, isSoundOn = true) => {
    return new Promise(async (resolve) => {
        if (!soundFile) {
            console.warn('No audio file provided.');
            resolve();
            return;
        }

        try {
            await ensureAudioMode();
            const player = createAudioPlayer(soundFile);
            player.loop = shouldLoop;

            if (!isSoundOn) {
                player.remove();
                resolve();
                return;
            }

            const subscription = player.addListener('playbackStatusUpdate', (status) => {
                if (status.didJustFinish && !shouldLoop) {
                    subscription.remove();
                    player.remove();
                    resolve();
                }
            });

            player.play();
        } catch (error) {
            console.error('Audio playback failed:', error);
            resolve();
        }
    });
};
