import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    SafeAreaView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import { ERC_ALGORITHMS } from './erc_algorithms';
import { ModalScreenHeader } from '../../../common/ModalScreenHeader';
import { WINDOW_HEIGHT, WINDOW_WIDTH, scale } from '../../../../utils/scale';
import { COLORS } from '../../../../styles/layout';

export default function AlgorithmModal({ visible, setShowAlgorithmsModal }) {
    const { t } = useTranslation();
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

    const selected = ERC_ALGORITHMS.find((item) => item.id === selectedAlgorithm);

    const closeList = () => setShowAlgorithmsModal(false);

    return (
        <>
            <Modal visible={visible} animationType="slide" onRequestClose={closeList}>
                <SafeAreaView style={styles.safeArea}>
                    <StatusBar barStyle="light-content" />
                    <ModalScreenHeader
                        title={t('ercAlgorithms')}
                        onBack={closeList}
                        variant="dark"
                    />

                    <ScrollView
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {ERC_ALGORITHMS.map(({ id, labelKey }) => (
                            <TouchableOpacity
                                key={id}
                                style={styles.listItem}
                                onPress={() => setSelectedAlgorithm(id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.listItemText}>
                                    <Text style={styles.listItemTitle}>{t(labelKey)}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={scale(22)} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            {selected && (
                <Modal
                    visible={true}
                    animationType="fade"
                    onRequestClose={() => setSelectedAlgorithm(null)}
                    statusBarTranslucent
                >
                    <View style={styles.viewer}>
                        <SafeAreaView style={styles.viewerHeader}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSelectedAlgorithm(null)}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                            >
                                <Ionicons name="close" size={scale(28)} color="#FFFFFF" />
                            </TouchableOpacity>
                            <Text style={styles.viewerTitle} numberOfLines={2}>
                                {t(selected.labelKey)}
                            </Text>
                            <View style={styles.closeSpacer} />
                        </SafeAreaView>

                        <ImageZoom
                            cropWidth={WINDOW_WIDTH}
                            cropHeight={WINDOW_HEIGHT * 0.85}
                            imageWidth={WINDOW_WIDTH}
                            imageHeight={WINDOW_HEIGHT * 0.85}
                            minScale={1}
                            maxScale={4}
                        >
                            <Image source={selected.image} style={styles.algorithmImage} resizeMode="contain" />
                        </ImageZoom>

                        <Text style={styles.pinchHint}>{t('pinchToZoom')}</Text>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: scale(16),
        paddingBottom: scale(24),
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: scale(12),
        paddingVertical: scale(16),
        paddingHorizontal: scale(16),
        marginBottom: scale(10),
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    listItemText: {
        flex: 1,
        paddingRight: scale(8),
    },
    listItemTitle: {
        fontSize: scale(15),
        fontWeight: '600',
        color: COLORS.text,
        lineHeight: scale(20),
    },
    viewer: {
        flex: 1,
        backgroundColor: '#0D1117',
    },
    viewerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(8),
        paddingBottom: scale(8),
        backgroundColor: '#0D1117',
    },
    closeButton: {
        width: scale(44),
        height: scale(44),
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeSpacer: {
        width: scale(44),
    },
    viewerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: '600',
        paddingHorizontal: scale(8),
    },
    algorithmImage: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * 0.85,
        backgroundColor: '#0D1117',
    },
    pinchHint: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontSize: scale(12),
        paddingVertical: scale(8),
    },
});
