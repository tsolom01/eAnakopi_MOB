import {secondsToTimeHHMMSS, secondsToTimeMMSS} from "../../../utils/formatTime";
import   styles   from './styles';
import Svg, { Circle } from 'react-native-svg';
import {t} from "i18next";
import {useCPRTimerStore} from "../../../stores/timerStore";
import {Text, TouchableOpacity, View} from "react-native";
import React , {useState} from "react";
import { useACLSStartStop} from '../../../logic/ACLS/useACLSStartStop';
//import {EndAclsReasonModal} from "../../modals/EndAclsReasonModal"
import {GenericReasonModal} from "../../modals/Generic/listAndSelectModal";
import { ACLS_END_REASONS } from '../../../constants/ACLS/endReasons';

const ArrestTimerVisualizer = () => {
    const [showEndModal, setShowEndModal] = useState(false);
    const arrestTimer = useCPRTimerStore((state) => state.arrestTimer);
    const {    handleStart,        handleStop,    } = useACLSStartStop();
    const isArrestTimerRunning = useCPRTimerStore((state) => state.isArrestTimerRunning);


    const onAclsTogglePress = () => {
        if (!isArrestTimerRunning) {
            handleStart();
        } else {
            setShowEndModal(true); // Show confirmation modal before stopping
        }
    };

    const onSelectEndReason = (reason) => {
        //console.log('ACLS ended due to:', reason.label);
        handleStop(reason); // Now it's safe to reset everything
        setShowEndModal(false);
    };

    const onCancelEndModal = () => {
        setShowEndModal(false); // Just hide it, don't reset anything
    };
    return (
        <View>
            <View style={styles.timerContainer}>
                <Text style={styles.arrestTimer}>{secondsToTimeHHMMSS(arrestTimer)}</Text>
            </View>


              <TouchableOpacity
                    style={[styles.startButton, { backgroundColor: isArrestTimerRunning ? 'red' : '#2ECC71' }]}
                    onPress={onAclsTogglePress}
            >
                    <Text style={styles.buttonText}>{isArrestTimerRunning ? t('stopCPRSequence') : t('startCPRSequence') } </Text>
            </TouchableOpacity>

            <GenericReasonModal
                visible={showEndModal}
                titleKey= 'end_reason.title'
                showCancel={true}
                items={ACLS_END_REASONS}
                cancelTextKey= 'cancel'
                onSelect={onSelectEndReason}
                onCancel={onCancelEndModal}
            />
        </View>
    );
};




export default ArrestTimerVisualizer;