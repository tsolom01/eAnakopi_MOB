import React, { useMemo, useState } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import { ERC_ALGORITHMS } from './erc_algorithms';
import { ModalScreenHeader } from '../../../common/ModalScreenHeader';
import { WINDOW_WIDTH, scale } from '../../../../utils/scale';
import { COLORS } from '../../../../styles/layout';

function normalizeSearchText(value) {
    return value.trim().toLowerCase();
}

export default function AlgorithmModal({ visible, setShowAlgorithmsModal }) {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [imageAreaHeight, setImageAreaHeight] = useState(0);

    const selected = ERC_ALGORITHMS.find((item) => item.id === selectedAlgorithm);

    const filteredAlgorithms = useMemo(() => {
        const query = normalizeSearchText(searchQuery);
        if (!query) return ERC_ALGORITHMS;

        return ERC_ALGORITHMS.filter(({ id, labelKey }) => {
            const label = t(labelKey).toLowerCase();
            return label.includes(query) || id.toLowerCase().includes(query);
        });
    }, [searchQuery, t]);

    const closeList = () => {
        setSearchQuery('');
        setSelectedAlgorithm(null);
        setShowAlgorithmsModal(false);
    };

    const closeViewer = () => {
        setSelectedAlgorithm(null);
        setImageAreaHeight(0);
    };

    return (
        <>
            <Modal visible={visible} animationType="slide" onRequestClose={closeList}>
                <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
                    <StatusBar barStyle="light-content" />
                    <ModalScreenHeader
                        title={t('ercAlgorithms')}
                        onBack={closeList}
                        variant="dark"
                    />

                    <View style={styles.searchContainer}>
                        <Ionicons
                            name="search"
                            size={scale(20)}
                            color={COLORS.textSecondary}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder={t('algorithmSearch.placeholder')}
                            placeholderTextColor={COLORS.textSecondary}
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchQuery('')}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                accessibilityRole="button"
                                accessibilityLabel={t('algorithmSearch.clear')}
                            >
                                <Ionicons name="close-circle" size={scale(20)} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <ScrollView
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {filteredAlgorithms.length === 0 ? (
                            <Text style={styles.emptyText}>{t('algorithmSearch.noResults')}</Text>
                        ) : (
                            filteredAlgorithms.map(({ id, labelKey }) => (
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
                            ))
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            {selected && (
                <Modal
                    visible
                    animationType="fade"
                    onRequestClose={closeViewer}
                >
                    <SafeAreaView style={styles.viewer} edges={['top', 'left', 'right', 'bottom']}>
                        <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
                        <View style={styles.viewerHeader}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeViewer}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                accessibilityRole="button"
                                accessibilityLabel={t('back')}
                            >
                                <Ionicons name="close" size={scale(28)} color="#FFFFFF" />
                            </TouchableOpacity>
                            <Text style={styles.viewerTitle} numberOfLines={2}>
                                {t(selected.labelKey)}
                            </Text>
                            <View style={styles.closeSpacer} />
                        </View>

                        <View
                            style={styles.imageArea}
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                if (height > 0 && height !== imageAreaHeight) {
                                    setImageAreaHeight(height);
                                }
                            }}
                        >
                            {imageAreaHeight > 0 && (
                                <ImageZoom
                                    cropWidth={WINDOW_WIDTH}
                                    cropHeight={imageAreaHeight}
                                    imageWidth={WINDOW_WIDTH}
                                    imageHeight={imageAreaHeight}
                                    minScale={1}
                                    maxScale={4}
                                >
                                    <Image
                                        source={selected.image}
                                        style={[styles.algorithmImage, { height: imageAreaHeight }]}
                                        resizeMode="contain"
                                    />
                                </ImageZoom>
                            )}
                        </View>

                        <Text style={[styles.pinchHint, { paddingBottom: Math.max(insets.bottom, scale(8)) }]}>
                            {t('pinchToZoom')}
                        </Text>
                    </SafeAreaView>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scale(16),
        marginVertical: scale(12),
        paddingHorizontal: scale(12),
        borderRadius: scale(12),
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        minHeight: scale(44),
    },
    searchIcon: {
        marginRight: scale(8),
    },
    searchInput: {
        flex: 1,
        fontSize: scale(15),
        color: COLORS.text,
        paddingVertical: scale(10),
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: scale(16),
        paddingBottom: scale(24),
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.textSecondary,
        fontSize: scale(15),
        marginTop: scale(24),
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
    imageArea: {
        flex: 1,
    },
    algorithmImage: {
        width: WINDOW_WIDTH,
        backgroundColor: '#0D1117',
    },
    pinchHint: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontSize: scale(12),
        paddingTop: scale(8),
    },
});
