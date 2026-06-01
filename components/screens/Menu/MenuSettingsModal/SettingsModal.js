import React, { useEffect, useState } from 'react';
import {    Modal,    ScrollView,    Text,    TouchableOpacity,    View  ,TextInput} from 'react-native';
import modalStyles from '../../../../styles/modal.js';
import styles from './styles';
import {useTranslation} from "react-i18next"; // local
import audioController  from "../../../../logic/audio/audioController";
import {useCPRTimerStore} from "../../../../stores/timerStore";



const SettingsModal = ({
                           visible,
                           onClose,
                       }) => {
    const { t,i18n } = useTranslation();
    const { playOnce,  playLoop , stop , isPlaying} = audioController();
    const constCPRTimer = useCPRTimerStore((state) => state.constCPRTimer);
    const [heartbeatOn, setHeartbeatOn] = useState(false);
    const [timerInput, setTimerInput] = useState(String(constCPRTimer));
    const updateConstCPRTimer = useCPRTimerStore((state) => state.updateConstCPRTimer);




    useEffect(() => {
        // Check initial heartbeat state when modal opens
        const checkStatus = async () => {
            const playing = await isPlaying('heartbeat');
            setHeartbeatOn(playing);
        };
        if (visible) {
            checkStatus();
        }
    }, [visible]);

    const handleTimerChange = (text) => {
        setTimerInput(text);
    };

    const applyNewTimer = () => {
        const parsed = parseInt(timerInput, 10);
        if (!isNaN(parsed) && parsed > 0) {
            updateConstCPRTimer(parsed);
        }
    };

    const toggleHeartbeat = async () => {

        const playing = await isPlaying('heartbeat');

        if (playing) {
            await stop('heartbeat');
            setHeartbeatOn(false);
        } else {
            await playLoop('heartbeat');
            setHeartbeatOn(true);
        }
    };


    return (
        <Modal visible={visible} animationType="slide">
            <View style={modalStyles.modalView}>
                <Text style={modalStyles.modalText}>{t('settings')}</Text>

                <View style={styles.settingOption}>
                    <Text style={styles.settingText}>{t('enableHeartbeat')}</Text>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            { backgroundColor: !heartbeatOn  ? '#2ECC71' : '#E74C3C' },
                        ]}
                        onPress={toggleHeartbeat}
                    >
                        <Text style={styles.toggleButtonText}>
                            { !heartbeatOn ?  'ON' : 'OFF'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* CPR Timer Setting */}
                <View style={styles.settingOption}>
                    <Text style={styles.settingText}>{t('settingModal.cprCycleDuration')}</Text>
                    <TextInput
                        style={styles.input}
                        value={timerInput}
                        onChangeText={handleTimerChange}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.toggleButton} onPress={applyNewTimer}>
                        <Text style={[styles.toggleButtonText , {backgroundColor: '#2ECC71'}] }>{t('apply')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.settingOption}>
                    <Text style={styles.settingText}>{t('language')}</Text>
                    <View style={styles.languageButtons}>
                        <TouchableOpacity
                            style={[
                                styles.languageButton,
                                i18n.language === 'en' && styles.selectedLanguage,
                            ]}
                            onPress={() => i18n.changeLanguage('en')}
                        >
                            <Text style={styles.languageButtonText}>{t('english')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.languageButton,
                                i18n.language === 'gr' && styles.selectedLanguage,
                            ]}
                            onPress={() => i18n.changeLanguage('gr')}
                        >
                            <Text style={styles.languageButtonText}>{t('greek')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={onClose}>
                    <Text style={modalStyles.modalOption}>{t('back')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default SettingsModal;