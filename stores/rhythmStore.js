import { create } from 'zustand';

export const useRhythmStore = create((set) => ({
    selectedRhythm: null,
    selectionVersion: 0, // This increments with every selection
    setSelectedRhythm: (rhythm) =>
        set((state) => ({
            selectedRhythm: rhythm,
            selectionVersion: state.selectionVersion + 1,
        })),
}));