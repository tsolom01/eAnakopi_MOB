import AlgorithmModal from '../MenuAlgorithmModal/AlgorithmModal';
import SettingsModal from '../MenuSettingsModal/SettingsModal';
import GuidesModal from '../MenuGuidesModal/GuidesModal';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Linking } from 'react-native';
import modalStyles from './styles';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { config } from '../../../../constants/config';

const openLegalDocument = async (path) => {
    const url = `${config.apiBaseUrl}${path}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
        await Linking.openURL(url);
    }
};

const MenuModal = ({
    visible,
    setShowMenuModal,
}) => {
    const { t } = useTranslation();
    const [showAlgorithmsModal, setShowAlgorithmsModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showGuidesModal, setShowGuidesModal] = useState(false);

    return (
        <Modal visible={visible} animationType="slide">
            <View style={modalStyles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={modalStyles.title}>{t('menu')}</Text>
                    <TouchableOpacity style={[styles.reasonButton, styles.info]} onPress={() => {
                        setShowGuidesModal(true);
                    }}>
                        <Text style={styles.label}>{t('menuModal.guide')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reasonButton, styles.info]} onPress={() => {
                        setShowSettingsModal(true);
                    }}>
                        <Text style={styles.label}>{t('menuModal.settings')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reasonButton, styles.info]} onPress={() => {
                        setShowAlgorithmsModal(true);
                    }}>
                        <Text style={styles.label}>{t('menuModal.ercAlgorithms')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.reasonButton, styles.info]}
                        onPress={() => openLegalDocument('/privacy')}
                    >
                        <Text style={styles.label}>{t('menuModal.privacyPolicy')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.reasonButton, styles.info]}
                        onPress={() => openLegalDocument('/terms')}
                    >
                        <Text style={styles.label}>{t('menuModal.termsAndConditions')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setShowMenuModal(false)}>
                        <Text style={styles.cancelText}>{t('back')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <AlgorithmModal
                visible={showAlgorithmsModal}
                setShowAlgorithmsModal={setShowAlgorithmsModal}
            />

            <SettingsModal
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />

            <GuidesModal
                visible={showGuidesModal}
                setShowGuidesModal={setShowGuidesModal}
            />
        </Modal>
    );
};

export default MenuModal;
