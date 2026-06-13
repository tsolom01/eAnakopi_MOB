import React, { useState, useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeTopBar from '../components/Home/HomeTopBar';
import ArrestTimerVisualizer from '../components/Home/arrestTimer';
import CardiacArrestButton from '../components/Home/CardiacArrestButton';
import CPRTimerVisualizer from '../components/Home/CPRTimer';
import RhythmsButtons from '../components/Home/RhythmsButtons';
import ActualInterventionsPanel from '../components/Home/ActualInterventionsPanel';
import MenuModal from '../components/screens/Menu/MenuModal/MenuModal';
import OrganizationLogos from '../components/common/OrganizationLogos';
import LoginModal from '../components/auth/LoginModal';
import ProfileScreen from './ProfileScreen';
import { InterventionWatcher } from '../logic/interventions/InterventionWatcher';
import { HomeLayoutProvider, getHomeLayoutMetrics } from '../context/HomeLayoutContext';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const { height: windowHeight } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const layout = useMemo(
        () => getHomeLayoutMetrics({ windowHeight, insets }),
        [windowHeight, insets.top, insets.bottom]
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <HomeLayoutProvider metrics={layout}>
                <InterventionWatcher />

                <View style={styles.body}>
                    <View
                        style={[
                            styles.mainContent,
                            { gap: layout.sectionGap, paddingBottom: layout.contentPaddingBottom },
                        ]}
                    >
                        <View style={styles.section}>
                            <HomeTopBar
                                onMenuPress={() => setShowMenuModal(true)}
                                onLoginPress={() => setShowLoginModal(true)}
                                onProfilePress={() => setShowProfile(true)}
                            />
                        </View>

                        <View style={[styles.section, styles.actionsSection, { gap: layout.sectionGap }]}>
                            <ArrestTimerVisualizer />
                            <CardiacArrestButton />
                        </View>

                        <View style={styles.section}>
                            <CPRTimerVisualizer />
                        </View>

                        <View style={styles.section}>
                            <RhythmsButtons />
                        </View>

                        <View style={[styles.section, styles.interventionsSection]}>
                            <ActualInterventionsPanel />
                        </View>
                    </View>

                    <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
                        <OrganizationLogos />
                    </SafeAreaView>
                </View>

                <MenuModal visible={showMenuModal} setShowMenuModal={setShowMenuModal} />
                <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
                <ProfileScreen visible={showProfile} onClose={() => setShowProfile(false)} />
            </HomeLayoutProvider>
        </SafeAreaView>
    );
};

export default HomeScreen;
