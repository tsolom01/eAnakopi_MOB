import { Audio } from 'expo-av';


export const playAudio = (soundFile, shouldLoop = false, isSoundOn = true) => {
    return new Promise(async (resolve, reject) => {
        if (!soundFile) {
            console.warn(`No Audio found for: ${soundFile}`);
            resolve();
            return;
        }

        const sound = new Audio.Sound();

        try {
            await sound.loadAsync(soundFile);
            await sound.setVolumeAsync(1.0);
            if (shouldLoop) {
                await sound.setIsLoopingAsync(true);
            }

            if (isSoundOn) {
                await sound.playAsync();
            } else {
                await sound.stopAsync();
                resolve();
                return;
            }

            // Listen for playback status updates
            sound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.didJustFinish && !status.isLooping) {
                    try {
                        await sound.unloadAsync();
                        resolve();
                    } catch (unloadError) {
                        console.warn('Error unloading sound:', unloadError);
                        resolve(); // Resolve anyway
                    }
                }
            });
        } catch (error) {
            console.error('Audio playback failed:', error);
            resolve(); // Resolve so sequence continues even if error
        }
    });
};