import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Home/header';
import ArrestTimerVisualizer from '../components/Home/arrestTimer';
import CPRTimerVisualizer from '../components/Home/CPRTimer';
import RhythmsButtons from '../components/Home/RhythmsButtons';
import ActualInterventionsPanel from '../components/Home/ActualInterventionsPanel';
import MenuModal from '../components/screens/Menu/MenuModal/MenuModal';
import { InterventionWatcher } from '../logic/interventions/InterventionWatcher';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
    const [showMenuModal, setShowMenuModal] = useState(false);

    useEffect(() => {
        console.log("Debugging ... Home Screen  loaded!");
    }, []);

    return (
        <View style={styles.container}>
             <InterventionWatcher />*
            <Header onMenuPress={() => setShowMenuModal(true)} />
             <ArrestTimerVisualizer />
             <CPRTimerVisualizer />
             <RhythmsButtons />
             <ActualInterventionsPanel />
            <MenuModal
                visible={showMenuModal}
                setShowMenuModal={setShowMenuModal}
            />
        </View>
    );
};

export default HomeScreen;


