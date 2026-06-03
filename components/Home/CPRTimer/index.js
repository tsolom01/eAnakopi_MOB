import { useCPRTimerStore } from '../../../stores/timerStore';
import { View, Text } from 'react-native';
import { secondsToTimeMMSS } from '../../../utils/formatTime';
import { getCPRTimerSize, scale } from '../../../utils/scale';
import timersStyles from './styles';
import Svg, { Circle } from 'react-native-svg';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import audioController from '../../../logic/audio/audioController';
import { GenericReasonModal } from '../../modals/Generic/listAndSelectModal';
import { heartRhythms } from '../../../constants/rhythm/rhythmDefinitions';
import { useHandleRhythmSelection } from '../../../logic/rhythm/useHandleRhythmSelection';

const CPRTimerVisualizer = () => {
    const handleRhythmSelection = useHandleRhythmSelection();
    const timerSize = getCPRTimerSize();
    const radius = 54 * (timerSize / scale(182));
    const circumference = 2 * Math.PI * radius;
    const cprTimer = useCPRTimerStore((state) => state.cprTimer);
    const constCPRTimer = useCPRTimerStore((state) => state.constCPRTimer);
    const cyclesCounter = useCPRTimerStore((state) => state.cyclesCounter);
    const { playOnce } = audioController();
    const heartRhythmsArray = Object.values(heartRhythms);
    const [showRhythmsModal, setShowRhythmsModal] = useState(false);

    useEffect(() => {
        if (cyclesCounter > 1) {
            setShowRhythmsModal(true);
            playOnce('selectRhythm');
        }
    }, [cyclesCounter]);

    return (
        <View style={timersStyles.cycleContainer}>
            <View style={[timersStyles.circleContainer, { width: timerSize, height: timerSize }]}>
                <Svg height={timerSize} width={timerSize} viewBox="0 0 140 140">
                    <Circle cx="70" cy="70" r={radius} fill="none" stroke="#FFC0C0" strokeWidth={3} />
                    <Circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        stroke="red"
                        strokeWidth={5}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (cprTimer / constCPRTimer)}
                    />
                </Svg>

                <View style={timersStyles.textOverlay}>
                    <Text style={timersStyles.CPRTimerText}>{secondsToTimeMMSS(cprTimer)}</Text>
                </View>
            </View>

            <Text style={timersStyles.cyclesCounterText}>
                {t('cycle')}: {cyclesCounter}
            </Text>

            <GenericReasonModal
                visible={showRhythmsModal}
                titleKey="rhythms_list.title"
                showCancel={false}
                items={heartRhythmsArray}
                cancelTextKey="cancel"
                onSelect={(rhythm) => {
                    setShowRhythmsModal(false);
                    handleRhythmSelection(rhythm);
                }}
            />
        </View>
    );
};

export default CPRTimerVisualizer;
