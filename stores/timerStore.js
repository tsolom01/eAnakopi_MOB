import { create } from 'zustand';

export const useCPRTimerStore = create((set, get) => ({
    // Timers
    arrestTimer: 0,
    cprTimer: 120,
    constCPRTimer: 120,
    // Start at 0, but bump to 1 when CPR starts
    cyclesCounter: 0,

    // States
    isArrestTimerRunning: false,
    isCPRTimerRunning: false,



    // Timer IDs
    intervalIds: {
        arrest: null,
        cpr: null,
    },

    // Start arrestTimer (e.g. when cardiac arrest is confirmed)
    startArrestTimer: () => {
        if (get().isArrestTimerRunning) return;

        const id = setInterval(() => {
            set((state) => ({ arrestTimer: state.arrestTimer + 1 }));
        }, 1000);

        set({
            isArrestTimerRunning: true,
            intervalIds: { ...get().intervalIds, arrest: id },
        });
    },

    // Start CPR timer and set initial cycle to 1
    startCPRTimer: () => {
        if (get().isCPRTimerRunning) return;

        // If CPR hasn't started yet, set first cycle
        if (get().cyclesCounter === 0) {
            set({ cyclesCounter: 1 });
        }

        const id = setInterval(() => {
            const { cprTimer } = get();

            if (cprTimer === 0) {
                set((state) => ({
                    cprTimer: state.constCPRTimer,
                    cyclesCounter: state.cyclesCounter + 1,
                }));
            } else {
                set({ cprTimer: cprTimer - 1 });
            }
        }, 1000);

        set({
            isCPRTimerRunning: true,
            intervalIds: { ...get().intervalIds, cpr: id },
        });
    },

    stopAllTimers: () => {
        const { intervalIds } = get();
        clearInterval(intervalIds.arrest);
        clearInterval(intervalIds.cpr);

        set({
            isArrestTimerRunning: false,
            isCPRTimerRunning: false,
            intervalIds: { arrest: null, cpr: null },
        });
    },

    stopCPRTimer: () => {
        const { intervalIds } = get();
        clearInterval(intervalIds.cpr);
        set((state) => ({
            isCPRTimerRunning: false,
            intervalIds: {
                ...state.intervalIds,
                cpr: null,
            },
        }));
    },
    resetCPRTimer: (resetCycles = false) => set((state) => ({
        cprTimer: state.constCPRTimer,
        cyclesCounter: resetCycles ? 0 : state.cyclesCounter,
    })),

    updateConstCPRTimer: (newTime) => {
        set({
            constCPRTimer: newTime,
            cprTimer: newTime, // reset cprTimer to new base
        });
    },


    resetAllTimers: () => {
        get().stopAllTimers();
        set({
            arrestTimer: 0,
            cprTimer: get().constCPRTimer,
            cyclesCounter: 0, // Start fresh
        });
    },
}));