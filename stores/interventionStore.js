import { create } from 'zustand';
import { interventions } from '../constants/interventions';

const generateInitialCounters = () => {
    return interventions.reduce((acc, intervention) => {
        acc[intervention.id] = { proposed: 0, actual: 0 };
        return acc;
    }, {});
};

export const useInterventionStore = create((set, get) => ({
    interventionCounters: generateInitialCounters(),
    interventionHistory: {},
    lastCycleAdrenalineGiven: -1,

    setLastCycleAdrenalineGiven: (cycle) => set({ lastCycleAdrenalineGiven: cycle }),

    getInterventionCounter: (id, interventionType) => {
        const state = get();
        return state.interventionCounters?.[id]?.[interventionType] || 0;
    },

        recordIntervention: (id, manualUserInterventionText ='NA',  interventionType, data) => {
            set((state) => {
                const prevHistory = state.interventionHistory[id] || [];
                const prevCounters = state.interventionCounters[id] || { actual: 0, proposed: 0 };

                return {
                    interventionHistory: {
                        ...state.interventionHistory,
                        [id]: [...prevHistory, { interventionType,manualUserInterventionText, data }],
                    },
                    interventionCounters: {
                        ...state.interventionCounters,
                        [id]: {
                            ...prevCounters,
                            [interventionType]: (prevCounters[interventionType] || 0) + 1,
                        },
                    },
                };
            });
        },

    getInterventionHistory: (id) => {
        return get().interventionHistory[id] || [];
    },


    getLastIntervention: (id, filterType = null) => {
        const history = get().interventionHistory[id] || [];

        const filtered = filterType
            ? history.filter((entry) => entry.interventionType === filterType)
            : history;

        return filtered.length > 0 ? filtered[filtered.length - 1] : null;
    },
    resetCounters: () => {
        set({ interventionCounters: generateInitialCounters() });
    },

    resetCounter: (id) =>
        set((state) => ({
            interventionCounters: {
                ...state.interventionCounters,
                [id]: { proposed: 0, actual: 0 },
            },
        })),

    resetAllInterventions: () => {
        get().resetCounters();
        set({
            interventionHistory: {},
            lastCycleAdrenalineGiven: -1,
        });
    },
}));
