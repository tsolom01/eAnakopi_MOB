import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import { useCPRTimerStore } from '../../stores/timerStore';
import { useHistoryStore } from '../../stores/historyStore';
import { useHandleRhythmSelection } from '../../logic/rhythm/useHandleRhythmSelection';
import audioController from '../../logic/audio/audioController';
import { GenericReasonModal } from '../modals/Generic/listAndSelectModal';
import { heartRhythms } from '../../constants/rhythm/rhythmDefinitions';
import { HistoryAction } from '../../constants/history/historyConstants';
import { useHomeLayout } from '../../context/HomeLayoutContext';
import timersStyles from './CPRTimer/styles';

const CardiacArrestButton = () => {
    const { actionButtonPaddingVertical } = useHomeLayout();
    const handleRhythmSelection = useHandleRhythmSelection();
    const isArrestTimerRunning = useCPRTimerStore((state) => state.isArrestTimerRunning);
    const isCPRTimerRunning = useCPRTimerStore((state) => state.isCPRTimerRunning);
    const startCPRTimer = useCPRTimerStore((state) => state.startCPRTimer);
    const logUserAction = useHistoryStore((state) => state.logUserAction);
    const { playOnce } = audioController();
    const heartRhythmsArray = Object.values(heartRhythms);
    const [showRhythmsModal, setShowRhythmsModal] = useState(false);

    const onPress = () => {
        if (!isCPRTimerRunning) {
            logUserAction(HistoryAction.ARREST_TIMER_STARTED, 'useACLSStartStop', 'Cardiac Arrest confirmed');
            logUserAction(HistoryAction.CPR_TIMER_STARTED, 'useHandleRhythmSelection', 'CPR Timer Started');
            startCPRTimer();
            setShowRhythmsModal(true);
            playOnce('audio4H4T');
        }
    };

    const onRhythmSelect = (rhythm) => {
        setShowRhythmsModal(false);
        handleRhythmSelection(rhythm);
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    timersStyles.cardiacArrestButton,
                    {
                        backgroundColor: '#2ECC71',
                        opacity: isArrestTimerRunning && !isCPRTimerRunning ? 1 : 0.5,
                        paddingVertical: actionButtonPaddingVertical,
                    },
                ]}
                onPress={onPress}
                disabled={isCPRTimerRunning || !isArrestTimerRunning}
            >
                <Text style={timersStyles.cardiacArrestButtonText}>{t('confirmCardiacArrest')}</Text>
            </TouchableOpacity>

            <GenericReasonModal
                visible={showRhythmsModal}
                titleKey="rhythms_list.title"
                showCancel={false}
                items={heartRhythmsArray}
                cancelTextKey="cancel"
                onSelect={onRhythmSelect}
            />
        </>
    );
};

export default CardiacArrestButton;
