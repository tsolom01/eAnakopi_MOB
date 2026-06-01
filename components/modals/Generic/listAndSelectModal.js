import React from 'react';
import {    Modal,    View,    Text,    TouchableOpacity,} from 'react-native';
import styles from './styles';
import { t } from 'i18next';



export const GenericReasonModal = ({
                                      visible,
                                      title,
                                      titleKey,
                                      items = [],
                                      onSelect,
                                      onCancel,
                                      showCancel = true,
                                      showDescription = true,
                                      cancelTextKey,
                                      showOther = {visible:false,onPress:()=>{},label:'other',labelKey:'other'},

                                  }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>
                        {title || (titleKey ? t(titleKey) : t('pleaseSelectFromList'))}
                    </Text>

                    {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.reasonButton,
                                styles[item.displayType] || styles.neutral,
                            ]}
                            onPress={() => onSelect(item)}
                        >
                            <Text style={styles.label}>
                                {item.translateKey
                                    ? t(`${item.translateKey}.label`)
                                    : item.label}
                            </Text>
                            {showDescription && (
                                <Text style={styles.description}>
                                    {item.translateKey
                                        ? t(`${item.translateKey}.description`)
                                        : item.description}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                    {showOther.visible && (
                        <TouchableOpacity
                            style={[styles.reasonButton, styles.neutral ]}
                            onPress={() => showOther.onPress()}
                        >
                            <Text style={styles.label}>
                                {showOther.labelKey
                                    ? t(`${showOther.labelKey}`)
                                    : showOther.label}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {showCancel && (
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>
                                {t(cancelTextKey || 'cancel')}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};