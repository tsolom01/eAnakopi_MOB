
import { useCPRTimerStore } from '../../../stores/timerStore';
import {  View,  Text,  TouchableOpacity} from 'react-native';
import {secondsToTimeMMSS} from "../../../utils/formatTime";
import   timersStyles   from './styles';
import Svg, { Circle } from 'react-native-svg';
import {t} from "i18next";
import {useState} from "react";
import ConfirmationModal  from "../../modals/ConfirmationModal"
import {useHandleROSCDeclaration} from '../../../logic/ACLS/useHandleROSCDeclaration';


const CPRTimerVisualizer = () => {
    const CPRTimer = useCPRTimerStore((state) => state.cprTimer);
    const constCPRTimer = useCPRTimerStore((state) => state.constCPRTimer);
    const cyclesCounter = useCPRTimerStore((state) => state.cyclesCounter);
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const [showModal, setShowModal] = useState(false);
    const {    handleROSC,        handleNO    } = useHandleROSCDeclaration();
    const isArrestTimerRunning = useCPRTimerStore((state) => state.isArrestTimerRunning);

    const onTogglePress = () => {
           setShowModal(true); // Show confirmation modal before stopping
    };

    const onCancel = () => {
        setShowModal(false); // Just hide it, don't reset anything
    };
    const onROSC = () => {
        handleROSC();
        setShowModal(false)
    };

    return (
        <View style={timersStyles.cycleContainer}>
            <View style={timersStyles.cycleWrapper}>
                <View style={ timersStyles.circleContainer}>

                        <Svg height={200} width={200} viewBox="0 0 140 140">
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
                                strokeDashoffset={circumference * (CPRTimer / constCPRTimer)}
                            />
                        </Svg>

                    <View style={timersStyles.textWrapper}>
                        <Text style={timersStyles.CPRTimerText}>
                            {secondsToTimeMMSS(CPRTimer)}
                        </Text>
                        <Text style={timersStyles.cyclesCounterText}>
                            {t('cycle')}: {cyclesCounter}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            timersStyles.roscButton,
                            !isArrestTimerRunning && { opacity: 0.5 }  // Optional visual feedback
                        ]}
                        onPress={onTogglePress }
                        disabled={!isArrestTimerRunning}
                    >
                        <Text style={timersStyles.roscText}>{t('rosc')}</Text>
                    </TouchableOpacity>

                    <ConfirmationModal
                        visible={showModal}
                        title="Are you sure you want to declare ROSC?"
                        onConfirm={onROSC}
                        onCancel={onCancel}
                        confirmText="Yes"
                        cancelText="No"
                    />

                </View>
            </View>
        </View>



    );
};




export default CPRTimerVisualizer;