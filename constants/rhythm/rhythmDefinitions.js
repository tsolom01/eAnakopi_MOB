import { audioProvider } from '../../logic/audio/audioProvider';
export const heartRhythms = {
    VF: {
        id: 'VF',
        label: 'VF',
        description: 'Ventricular Fibrillation',
        shockable: true,
        translateKey:'rhythms.VF',
        displayType: 'success', // ✅ needed for styling
        onCycleChange: [
            { intervention: 'adrenaline', sound: 'consider_adrenaline',  text: 'Consider_adrenaline',  startFromCycle: 3,onEveryCycle: false,minCycleGap: 1,  vibration: true, },
        ],
        onSelect: [
            { intervention: 'shock' , sound: 'considerShock',  text: 'Consider  shock ',   vibration: true, },
            { intervention: 'consecutiveShock' ,   text: 'for system use ' },
        ],
        onConsecutiveShocks: [
            { shockNumbers: [3, 5],  intervention: 'amiodarone', sound: 'administer_amiodarone',  text: 'Administer Amiodarone' },
        ],
    },
    PVT: {
        id: 'PVT',
        label: 'PVT',
        description: 'Pulseless Ventricular Tachycardia',
        shockable: true,
        translateKey:'rhythms.PVT',
        displayType: 'success', // ✅ needed for styling
        onCycleChange: [
            { intervention: 'adrenaline', sound: 'consider_adrenaline',  text: 'Consider_adrenaline',  startFromCycle: 3,onEveryCycle: false, minCycleGap: 1,  vibration: true, },
        ],
        onSelect: [
            { intervention: 'shock' , sound: 'noPulseConsiderShock',  text: 'Consider  shock ',   vibration: true, },
            { intervention: 'consecutiveShock' ,  text: 'for system use ' },
        ],


        onConsecutiveShocks: [
            { shockNumbers: [3, 5],  intervention: 'amiodarone', sound: 'administer_amiodarone',  text: 'Administer Amiodarone' },
        ],
    },
    ASYSTOLE: {
        id: 'ASYSTOLE',
        label: 'ASYSTOLE',
        description: 'Asystole',
        shockable: false,
        translateKey:'rhythms.ASYSTOLE',
        displayType: 'error', // ✅ needed for styling

        onCycleChange: [
            { intervention: 'adrenaline', sound: 'consider_adrenaline',  text: 'Consider_adrenaline',  startFromCycle: 1,onEveryCycle: false, minCycleGap: 1,  vibration: true, },
        ],
        onSelect: [
            {  sound: 'continueCPR',  text: 'Continue CPR ',   vibration: true, },

        ],
    },
    PEA: {
        id: 'PEA',
        label: 'PEA',
        description: 'Pulseless Electrical Activity',
        shockable: false,
        translateKey:'rhythms.PEA',
        displayType: 'error', // ✅ needed for styling
        onCycleChange: [
            { intervention: 'adrenaline', sound: 'consider_adrenaline',  text: 'Consider_adrenaline',  startFromCycle: 1,onEveryCycle: false, minCycleGap: 1, vibration: true, },
        ],
        onSelect: [
            { sound: 'noPulseContCPR',  text: 'If no  pulse continue CPR ',   vibration: true, },
        ],
    },
};
