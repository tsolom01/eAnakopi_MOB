import   styles   from './styles';
import {t} from "i18next";
import {Image, Text, TouchableOpacity, View , Button, TextInput ,Modal }  from "react-native";
import React, {useState , useMemo} from "react";
import { useHandleActualIntervention} from '../../../logic/interventions/useHandleActualIntervention';
import { interventions } from '../../../constants/interventions';
import { useInterventionStore } from '../../../stores/interventionStore';
import  {CustomButton} from '../../../components/buttons/customButton'
import {GenericReasonModal} from "../../modals/Generic/listAndSelectModal";
import {useHistoryStore} from "../../../stores/historyStore";
import {HistoryAction} from "../../../constants/history/historyConstants";

import { useHomeLayout } from '../../../context/HomeLayoutContext';

const ActualInterventionsPanel = () => {
    const {
        interventionIconSize,
        interventionLabelSize,
        extraButtonGap,
        extraButtonPaddingVertical,
        sectionGap,
    } = useHomeLayout();

    const [showModal, setShowModal] = useState(false);
    const [showDescriptions, setShowDescriptions] = useState(true);
    const [showOther, setShowOther] = useState({});
    const [modalItems, setModalItems] = useState([]);
    const [modalTitleKey, setModalTitleKey] = useState('');
    const handleActualIntervention = useHandleActualIntervention();
    const interventionCounters = useInterventionStore((state) => state.interventionCounters);
    const [showCustomInputModal, setShowCustomInputModal] = useState(false);
    const [customMedicationText, setCustomMedicationText] = useState('');
    const { logUserAction } = useHistoryStore.getState();




    const triggerable = useMemo(
        () => interventions.filter((item) => item.triggerable !== false && item.visible === true),
        []
    );
    const nonTriggerableMeds = useMemo(
        () => interventions.filter((item) => item.triggerable === false && item.type === 'medication'),
        []
    );
    const nonTriggerableAirway = useMemo(
        () => interventions.filter((item) => item.triggerable === false && item.type === 'airway'),
        []
    );

    const renderButton = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.medicationButton}
            onPress={() => handleActualIntervention(item,'NA')}
        >
            <Image
                source={item.appIcon}
                style={{ width: interventionIconSize, height: interventionIconSize, resizeMode: 'contain' }}
            />
            <Text style={[styles.medicationButtonText, { fontSize: interventionLabelSize }]}>
                {t(`intervention.${item.id}.pluralLabel`, {defaultValue: t(`intervention.${item.id}.label`)})}: {interventionCounters[item.id]?.actual ?? 0}
            </Text>
        </TouchableOpacity>
    );

    const onOtherMedication = () => {
        setShowModal(false);
        setCustomMedicationText('');
        setShowCustomInputModal(true);
    }

    return (
        <View style={styles.allMedicationContainer}>
            {/* Triggerable buttons */}
            <View style={styles.medicationButtonsContainer}>
                {triggerable.map(renderButton)}
            </View>

            <View style={[styles.extraActionsSection, { gap: extraButtonGap, marginTop: sectionGap }]}>
            {nonTriggerableAirway.length > 0 && (
                <CustomButton
                    title="airway_button"
                    translate={true}
                    compact
                    style={{ paddingVertical: extraButtonPaddingVertical, marginBottom: 0 }}
                    onPress={() => {
                        setModalItems(nonTriggerableAirway);
                        setModalTitleKey('airway_list.title');
                        setShowModal(true);
                        setShowDescriptions(false);
                        setShowOther({visible:false})
                    }}
                />
            )}
            {nonTriggerableMeds.length > 0 && (
                <CustomButton
                    title="medication_extra_button"
                    translate={true}
                    compact
                    style={{ paddingVertical: extraButtonPaddingVertical, marginBottom: 0 }}
                    onPress={() => {
                        setModalItems(nonTriggerableMeds);
                        setModalTitleKey('medication_extra_list.title');
                        setShowDescriptions(false);
                        setShowModal(true);
                        setShowOther({visible:true,onPress:onOtherMedication,labelKey:'other',label:'other'})
                    }}
                />
            )}
            </View>

            {showCustomInputModal && (
                <Modal
                    transparent
                    animationType="slide"
                    visible={showCustomInputModal}
                    onRequestClose={() => setShowCustomInputModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{t('medication_custom_input.title')}</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={t('medication_custom_input.placeholder')}
                                value={customMedicationText}
                                onChangeText={setCustomMedicationText}
                            />
                            <View style={styles.modalButtons}>
                                <Button title={t('cancel')} onPress={() => setShowCustomInputModal(false)} />
                                <Button
                                    title={t('confirm')}
                                    onPress={() => {
                                        if (customMedicationText.trim()) {  //type,action, calledFrom, comment
                                            handleActualIntervention({id:'other'},customMedicationText.trim() );
                                            logUserAction(HistoryAction.INTERVENTION,'ActualInterventionsPanel', 'Intervention User Input: ' + customMedicationText.trim() + ' . ');
                                            setShowCustomInputModal(false);
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}



            <GenericReasonModal
                visible={showModal}
                titleKey={modalTitleKey}
                showDescription={showDescriptions}
                showCancel={true}
                showOther={showOther}
                items={modalItems}
                cancelTextKey="cancel"
                onSelect={(item) => {
                    setShowModal(false);
                    handleActualIntervention(item);
                }}
                onCancel={() => {
                    setShowModal(false);

                }}
               />

        </View>
    );
};

export default ActualInterventionsPanel;