
import AlgorithmModal from "../MenuAlgorithmModal/AlgorithmModal";
import SettingsModal from "../MenuSettingsModal/SettingsModal";
import GuidesModal from "../MenuGuidesModal/GuidesModal";
import {scale, confirmButtonLeftOffset, WINDOW_HEIGHT,WINDOW_WIDTH} from '../../../../utils/scale';
import React, {useEffect, useState} from 'react';
import {    Modal,        Text,    TouchableOpacity,    View } from 'react-native';
import modalStyles from './styles';
import styles from './styles';
import {useTranslation} from "react-i18next"; // local




const MenuModal = ({
                         visible,
                         setShowMenuModal,
                     }) => {
    const { t,i18n } = useTranslation();
    const [showAlgorithmsModal, setShowAlgorithmsModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showGuidesModal, setShowGuidesModal] = useState(false);


    return (
        <Modal visible={visible} animationType="slide">
            <View style={modalStyles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={modalStyles.title}>{t('menu')}</Text>
                    <TouchableOpacity style={[styles.reasonButton,styles.info]} onPress={() => {
                        setShowGuidesModal(true);
                    }}>
                        <Text style={[styles.label]}>{t('menuModal.guide')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reasonButton,styles.info]} onPress={() => {
                        setShowSettingsModal(true);
                    }}>
                        <Text style={[styles.label]}>{t('menuModal.settings')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reasonButton,styles.info]} onPress={() => {
                        setShowAlgorithmsModal(true);
                    }}>
                        <Text style={[styles.label]}>{t('menuModal.ercAlgorithms')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cancelButton]} onPress={() => setShowMenuModal(false)}>
                        <Text style={[styles.cancelText]}>{t('back')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <AlgorithmModal
                visible={showAlgorithmsModal}
                setShowAlgorithmsModal = {setShowAlgorithmsModal}
            />

            <SettingsModal
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />

            <GuidesModal
                visible={showGuidesModal}
                setShowGuidesModal = {setShowGuidesModal}
            />

        </Modal>



    );
};

export default MenuModal;