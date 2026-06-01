import { create } from 'zustand';
import  {useCurrentACLSContext} from '../logic/ACLS/useCurrentACLSContext'
import { HistoryCaller } from '../constants/history/historyConstants';

export const useHistoryStore = create((set) => ({
    history: [],
    addToHistory: (type,action,  calledFrom, comment) => {

        const snapshotFunction = useCurrentACLSContext();
        const data = snapshotFunction(type,action, calledFrom, comment);
  //      console.log('From History Store: ', data.type, data.action, data.arrestTimer, data.calledFrom , data.comment);
        set((state) => ({
            history: [...state.history, data],
        }));
    },
    logUserAction: (action,calledFrom, comment) => {
        useHistoryStore.getState().addToHistory(HistoryCaller.USER, action, calledFrom, comment);
    },

    logSystemAction: (action, calledFrom, comment) => {
        useHistoryStore.getState().addToHistory(HistoryCaller.SYSTEM, action, calledFrom, comment);
    },

    resetHistory: () => {

        set({
            history: [],

        });
    },
}));