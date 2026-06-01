import { ACLS_END_REASONS } from '../../constants/ACLS/endReasons';
import {    Modal,    View,    Text,    TouchableOpacity,} from 'react-native';
import styles from './styles';
import {t} from "i18next";
export const EndAclsReasonModal = ({ visible, onSelectReason, onClose }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Why is ACLS ending?</Text>

                    {ACLS_END_REASONS.map((reason) => (
                        <TouchableOpacity
                            key={reason.id}
                            style={[styles.reasonButton, styles[reason.type] || styles.neutral]}
                            onPress={() => onSelectReason(reason)}
                        >
                            <Text style={styles.label}>{reason.label}</Text>
                            <Text style={styles.description}>{reason.description}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelText}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};