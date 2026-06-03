import { create } from 'zustand';
import { createACLSSnapshot } from '../logic/ACLS/createACLSSnapshot';
import { HistoryCaller } from '../constants/history/historyConstants';

export const useHistoryStore = create((set) => ({
    history: [],
    addToHistory: (type,action,  calledFrom, comment) => {

        const data = createACLSSnapshot(type, action, calledFrom, comment);
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