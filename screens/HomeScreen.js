import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeTopBar from '../components/Home/HomeTopBar';
import ArrestTimerVisualizer from '../components/Home/arrestTimer';
import CardiacArrestButton from '../components/Home/CardiacArrestButton';
import CPRTimerVisualizer from '../components/Home/CPRTimer';
import RhythmsButtons from '../components/Home/RhythmsButtons';
import ActualInterventionsPanel from '../components/Home/ActualInterventionsPanel';
import MenuModal from '../components/screens/Menu/MenuModal/MenuModal';
import OrganizationLogos from '../components/common/OrganizationLogos';
import { InterventionWatcher } from '../logic/interventions/InterventionWatcher';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
    const [showMenuModal, setShowMenuModal] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <InterventionWatcher />

            <View style={styles.mainContent}>
                <View style={styles.section}>
                    <HomeTopBar onMenuPress={() => setShowMenuModal(true)} />
                </View>

                <View style={[styles.section, styles.actionsSection]}>
                    <ArrestTimerVisualizer />
                    <CardiacArrestButton />
                </View>

                <View style={[styles.section, styles.cprSection]}>
                    <CPRTimerVisualizer />
                </View>

                <View style={[styles.section, styles.rhythmsSection]}>
                    <RhythmsButtons />
                </View>

                <View style={[styles.section, styles.interventionsSection]}>
                    <ActualInterventionsPanel />
                </View>
            </View>

            <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
                <OrganizationLogos />
            </SafeAreaView>

            <MenuModal visible={showMenuModal} setShowMenuModal={setShowMenuModal} />
        </SafeAreaView>
    );
};

export default HomeScreen;
