
import { useCPRTimerStore } from '../../../stores/timerStore';
import {  View,  Text,  TouchableOpacity} from 'react-native';
import {secondsToTimeMMSS} from "../../../utils/formatTime";
import { scale } from '../../../utils/scale';
import   timersStyles   from './styles';
import Svg, { Circle } from 'react-native-svg';
import {t} from "i18next";
import React, {useEffect, useState} from "react";
import ConfirmationModal  from "../../modals/ConfirmationModal"
import {useHandleROSCDeclaration} from '../../../logic/ACLS/useHandleROSCDeclaration';
import audioController from "../../../logic/audio/audioController";
import {GenericReasonModal} from "../../modals/Generic/listAndSelectModal";
import {heartRhythms} from "../../../constants/rhythm/rhythmDefinitions";
import { useHandleRhythmSelection} from '../../../logic/rhythm/useHandleRhythmSelection';
import {HistoryAction} from "../../../constants/history/historyConstants";
import {useHistoryStore} from "../../../stores/historyStore";




const CPRTimerVisualizer = () => {
    const handleRhythmSelection = useHandleRhythmSelection();
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const {    handleROSC,        handleNO    } = useHandleROSCDeclaration();
    const cprTimer = useCPRTimerStore((state) => state.cprTimer);
    const constCPRTimer = useCPRTimerStore((state) => state.constCPRTimer);
    const cyclesCounter = useCPRTimerStore((state) => state.cyclesCounter);
    const isArrestTimerRunning = useCPRTimerStore((state) => state.isArrestTimerRunning);
    const isCPRTimerRunning = useCPRTimerStore((state) => state.isCPRTimerRunning);
    const stopCPRTimer = useCPRTimerStore((state) => state.stopCPRTimer);
    const startCPRTimer = useCPRTimerStore((state) => state.startCPRTimer,);
    const logUserAction = useHistoryStore((state) => state.logUserAction);

    const { playOnce } = audioController();
    const heartRhythmsArray = Object.values(heartRhythms);

    const [showROSCModal, setShowROSCModal] = useState(false);
    const [showRhythmsModal, setShowRhythmsModal] = useState(false);

    const onToggleROSCPress = () => {
           setShowROSCModal(true); // Show confirmation modal before stopping
    };

    const onToggleCardiacArrestPress = () => {
        if (!isCPRTimerRunning) {
                logUserAction(HistoryAction.ARREST_TIMER_STARTED,'useACLSStartStop', 'Cardiac Arrest confirmed');
                logUserAction(HistoryAction.CPR_TIMER_STARTED,'useHandleRhythmSelection','CPR Timer Started');
                startCPRTimer();
                setShowRhythmsModal(true); //
                playOnce('audio4H4T');
        }
        else {
            stopCPRTimer();
        }
    };
    const onToggleRhythmSelect  = (rhythm) =>  {
        setShowRhythmsModal(false);
        handleRhythmSelection(rhythm);

    }
    const onROSCCancel = () => {
        setShowROSCModal(false); // Just hide it, don't reset anything
    };
    const onROSC = () => {
        handleROSC();
        setShowROSCModal(false)
    };

    useEffect(() => {
        if (cyclesCounter > 1) {
            setShowRhythmsModal(true);
            playOnce('selectRhythm')
        }
       // checkAndTriggerInterventions();
    }, [cyclesCounter]);

    return (
        <View style={timersStyles.cycleContainer}>
            <TouchableOpacity
                style={[timersStyles.cardiacArrestButton,{backgroundColor: '#2ECC71' ,opacity: isArrestTimerRunning && !isCPRTimerRunning ? 1 : 0.5}]}
                onPress = {onToggleCardiacArrestPress}
                disabled={isCPRTimerRunning || !isArrestTimerRunning}
            >
                <Text style={timersStyles.cardiacArrestButtonText}>
                    { t('confirmCardiacArrest')}
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={[timersStyles.cardiacArrestButton,{backgroundColor: isCPRTimerRunning ? 'red' : '#2ECC71',opacity: isArrestTimerRunning? 1 : 0.5}]}
                onPress = {onToggleCardiacArrestPress}
                disabled={!isArrestTimerRunning}
            >
                <Text style={timersStyles.cardiacArrestButtonText}>
                    {isCPRTimerRunning ? t('stop') : t('confirmCardiacArrest')}
                </Text>
            </TouchableOpacity> */}
            <View style={timersStyles.cycleWrapper}>


                <View style={ timersStyles.circleContainer}>

                        <Svg height={scale(200)} width={scale(200)} viewBox="0 0 140 140">
                            <Circle
                                cx="70"
                                cy="70"
                                r={radius}
                                fill="none"
                                stroke="#FFC0C0"
                                strokeWidth={3}
                            />
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

                    <View style={timersStyles.textWrapper}>
                        <Text style={timersStyles.CPRTimerText}>
                            {secondsToTimeMMSS(cprTimer)}
                        </Text>

                    </View>
                    {/*     <TouchableOpacity
                        style={[
                            timersStyles.roscButton,
                            !isArrestTimerRunning && { opacity: 0.5 }  // Optional visual feedback
                        ]}
                        onPress={onToggleROSCPress }
                        disabled={!isArrestTimerRunning}
                    >
                        <Text style={timersStyles.roscText}>{t('rosc')}</Text>
                    </TouchableOpacity>

                    <ConfirmationModal
                        visible={showROSCModal}
                        title="Are you sure you want to declare ROSC?"
                        onConfirm={onROSC}
                        onCancel={onROSCCancel}
                        confirmText="Yes"
                        cancelText="No"
                    />  */}
                    <GenericReasonModal
                        visible={showRhythmsModal}
                        titleKey= 'rhythms_list.title'
                        showCancel={false}
                        items={heartRhythmsArray}
                        cancelTextKey= 'cancel'
                        onSelect={onToggleRhythmSelect}
                        //onCancel={onCancelEndModal}
                    />

                </View>
                <View style={timersStyles.cyclesCounterWrapper}>
                    <Text style={timersStyles.cyclesCounterText}>
                        {t('cycle')}: {cyclesCounter}
                    </Text>
                </View>
            </View>
        </View>



    );
};




export default CPRTimerVisualizer;