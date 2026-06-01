import { create } from 'zustand';

const useAudioStore = create((set, get) => ({
  soundRefs: {},

  setSoundRef: (key, sound) => {
    const refs = get().soundRefs;
    refs[key] = sound;
    set({ soundRefs: { ...refs } });
  },

  removeSoundRef: (key) => {
    const refs = get().soundRefs;
    delete refs[key];
    set({ soundRefs: { ...refs } });
  },

  getSoundRef: (key) => {
    return get().soundRefs[key];
  },
}));

export default useAudioStore;