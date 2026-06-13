import { useHomeLayout } from '../../../context/HomeLayoutContext';
import styles from './styles';
import { t } from 'i18next';
import { useCPRTimerStore } from '../../../stores/timerStore';
import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useACLSStartStop } from '../../../logic/ACLS/useACLSStartStop';
import { GenericReasonModal } from '../../modals/Generic/listAndSelectModal';
import { ACLS_END_REASONS } from '../../../constants/ACLS/endReasons';

const ArrestTimerVisualizer = () => {
    const { actionButtonPaddingVertical } = useHomeLayout();
    const [showEndModal, setShowEndModal] = useState(false);
    const { handleStart, handleStop } = useACLSStartStop();
    const isArrestTimerRunning = useCPRTimerStore((state) => state.isArrestTimerRunning);

    const onAclsTogglePress = () => {
        if (!isArrestTimerRunning) {
            handleStart();
        } else {
            setShowEndModal(true);
        }
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[
                    styles.startButton,
                    { backgroundColor: isArrestTimerRunning ? 'red' : '#2ECC71', paddingVertical: actionButtonPaddingVertical },
                ]}
                onPress={onAclsTogglePress}
            >
                <Text style={styles.buttonText}>
                    {isArrestTimerRunning ? t('stopCPRSequence') : t('startCPRSequence')}
                </Text>
            </TouchableOpacity>

            <GenericReasonModal
                visible={showEndModal}
                titleKey="end_reason.title"
                showCancel={true}
                items={ACLS_END_REASONS}
                cancelTextKey="cancel"
                onSelect={(reason) => {
                    handleStop(reason);
                    setShowEndModal(false);
                }}
                onCancel={() => setShowEndModal(false)}
            />
        </View>
    );
};

export default ArrestTimerVisualizer;
