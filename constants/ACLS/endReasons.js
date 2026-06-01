
export const ACLS_END_REASONS = [
    {
        id: 'rosc',
        label: 'ROSC (Return of Spontaneous Circulation)',
        description: 'Spontaneous circulation was restored',
        translateKey:'end_reason.rosc',
        displayType: 'success', // ✅ needed for styling
    },
    {
        id: 'false_call',
        label: 'False Alarm',
        description: 'No cardiac arrest was present',
        translateKey:'end_reason.false_call',
        displayType: 'neutral',
    },
    {
        id: 'found_in_rosc',
        label: 'Found in ROSC',
        description: 'Patient already had ROSC when responders arrived',
        translateKey:'end_reason.found_in_rosc',
        displayType: 'info',
    },
    {
        id: 'no_rosc',
        label: 'No ROSC',
        description: 'No response despite resuscitation efforts',
        translateKey:'end_reason.no_rosc',
        displayType: 'error',
    },
];