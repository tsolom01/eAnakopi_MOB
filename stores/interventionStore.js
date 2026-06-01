import { create } from 'zustand';
import {  interventionProvider } from '../providers/interventionProvider';

const generateInitialCounters = () => {
    return interventionProvider.reduce((acc, intervention) => {
        acc[intervention.id] = { proposed: 0, actual: 0 };
        return acc;
    }, {});
};

export const useInterventionStore = create((set, get) => ({
      interventionCounters:generateInitialCounters(),  //produce the following
  //  interventionCounters: {
  //      shock: { proposed: 0, actual: 0 },
  //      adrenaline: { proposed: 0, actual: 0 },
  //      amiodarone: { proposed: 0, actual: 0 },
  //  },
    interventionHistory: {},
    lastCycleAdrenalineGiven: -1,

    setLastCycleAdrenalineGiven: (cycle) => set({ lastCycleAdrenalineGiven: cycle }),

    incrementInterventionCounter: (id, interventionType) => {

        set((state) => ({
            interventionCounters: {
                ...state.interventionCounters, // keep all other interventions
                [id]: {
                    ...state.interventionCounters[id], // keep both actual & proposed
                    [interventionType]: state.interventionCounters[id][interventionType] + 1, // update the one you need
                },
            },
        }));
    },

    getInterventionCounter: (id, interventionType) => {
        const state = get();
        return state.interventionCounters?.[id]?.[interventionType] || 0;
    },

        recordIntervention: (id, manualUserInterventionText ='NA',  interventionType, data) => {

            console.log('From Intervention Store: ',data.arrestTimer,
                         id,
                         interventionType,
                         manualUserInterventionText,
                         'Rhythm:' + data.currentRhythm,
                         'Cycle:' + data.cyclesCounter,
                );
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

    //recordIntervention: (id, interventionType, data) => {
    //    set((state) => {
    //        const prev = state.interventionHistory[id] || [];
    //        console.log(id , interventionType, data.interventionCounters[id]['proposed']);
    //        return {
    //            interventionHistory: {
    //                ...state.interventionHistory,
    //                [id]: [...prev, {interventionType:interventionType, data:data}], // data = { timestamp, type, dose? }
    //            },
    //        }
    //    });
    //},

    getInterventionHistory: (id) => {
        return get().interventionHistory[id] || [];
    },


    getLastIntervention: (id, filterType = null) => {
        const history = get().interventionHistory[id] || [];

        const filtered = filterType
            ? history.filter((entry) => entry.type === filterType)
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
