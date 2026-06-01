import {useTranslation} from "react-i18next";
//import React, {useEffect, useState} from "react";
import { Modal,  Text, TouchableOpacity, View} from "react-native";


import modalStyles from "../../../styles/modal";


export default function RoscConfirmModal({
                                             showRoscConfirmation,
                                             handleRoscConfirmation
                                       }) {
    const { t } = useTranslation();


    return (
        <Modal visible={showRoscConfirmation} transparent animationType="slide">
            <View style={modalStyles.modalView}>
                <Text style={modalStyles.modalText}>{t('roscConfirmation')}</Text>
                <TouchableOpacity onPress={() => handleRoscConfirmation(true)}>
                    <Text style={modalStyles.modalOption}>{t('yes')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRoscConfirmation(false)}>
                    <Text style={modalStyles.modalOption}>{t('no')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
};
