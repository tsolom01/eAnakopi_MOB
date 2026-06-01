import audioProvider from "../logic/audio/audioProvider";

export const interventionProvider = [
    {
        id: 'shock',
        visible:true,
        label: 'Shock',
        translateKey:'intervention.shock',
        type: 'shock',
        requiresActiveCPR: true,
        triggerable: true,
        appIcon: require('../assets/images/appImages/shock.png'),
        rhythmIndications: ['VF', 'PVT'],
        maxDoses: null,  // unlimited
        doses: [{ value: 200, unit: 'J' }, { value: 300, unit: 'J' }],
        isConsecutive:false,
    },
    {
        id: 'adrenaline',
        visible:true,
        label: 'Adrenaline',
        translateKey:'intervention.adrenaline',
        type: 'medication',
        requiresActiveCPR: true,
        triggerable: true,
        appIcon: require('../assets/images/appImages/adrenaline.png'),
        rhythmIndications: ['ASYSTOLE', 'PEA', 'VF', 'PVT'],
        maxDoses: null, // unlimited
        doses:[{value: 1,    unit: "mg"}],
        isConsecutive:false,
    },
    {
        id: 'amiodarone',
        visible:true,
        label: 'Amiodarone',
        translateKey:'intervention.amiodarone',
        type: 'medication',
        requiresActiveCPR: true,
        triggerable: true,
        appIcon: require('../assets/images/appImages/amiodarone.png'),
        rhythmIndications: ['VF', 'PVT'],
        maxDoses: 2,
        doses:[{value: 150,    unit: "mg"},{value: 300,    unit: "mg"}],
        isConsecutive:false,

    },

    {
        id: 'magnesium',
        visible:false,
        label:'Magnesium',
        translateKey:'intervention.magnesium',
        type: 'medication',
        requiresActiveCPR: false,
        triggerable: false,
        appIcon: require('../assets/images/appImages/magnesium.png'),
        isConsecutive:false,
    },
    {
        id: 'calcium_chloride',
        visible:false,
        label: 'Calcium Chloride',
        translateKey:'intervention.calcium_chloride',
        type: 'medication',
        requiresActiveCPR: false,
        triggerable: false,
        appIcon: require('../assets/images/appImages/calcium_chloride.png'),
        isConsecutive:false,

    },
    {
        id: 'endotracheal_tube',
        visible:false,
        label: 'Endotracheal Tube',
        translateKey:'intervention.endotracheal_tube',
        type: 'airway',
        requiresActiveCPR: false,
        triggerable: false,
        appIcon: require('../assets/images/appImages/endotracheal_tube.png'),
        isConsecutive:false,

    },
    {
        id: 'igel',
        visible:false,
        label: 'I GEL',
        translateKey:'intervention.igel',
        type: 'airway',
        requiresActiveCPR: false,
        triggerable: false,
        appIcon: require('../assets/images/appImages/igel.png'),
        isConsecutive:false,

    },
    {
        id: 'other',
        visible:false,
        label: 'other',
        translateKey:'other',
        type: 'other',
        requiresActiveCPR: false,
        triggerable: false,
        isConsecutive:false,

    },
    {
        id: 'consecutiveShock',
        visible:false,
        label: 'consecutive Shock',
        translateKey:'consecutiveShock',
        type: 'system',
        requiresActiveCPR: false,
        triggerable: true,
        isConsecutive: true,

    },

];