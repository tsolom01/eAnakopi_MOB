import { create } from 'zustand';

export const useSessionReportStore = create((set) => ({
    report: null,
    visible: false,
    showReport: (report) => set({ report, visible: true }),
    dismissReport: () => set({ report: null, visible: false }),
}));
