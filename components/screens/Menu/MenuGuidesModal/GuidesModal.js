import React from 'react';
import {    Modal,    ScrollView,    Text,    TouchableOpacity,    View } from 'react-native';
import modalStyles from '../../../../styles/modal.js';
import styles from './styles';
import {useTranslation} from "react-i18next"; // local



const GuidesModal = ({
                           visible,
                         setShowGuidesModal
                       }) => {
    const { t,i18n } = useTranslation();
    return (
        <Modal visible={visible}  animationType="slide">
            <View style={modalStyles.modalView}>
                <Text style={modalStyles.modalText}>{t('guides')}</Text>
                <ScrollView style={styles.guideContent}>
                    <Text style={styles.guideText}>
                        {i18n.language === 'en' ?
                            "1. Press START to begin the timer\n\n" +
                            "2. Confirm Cardiac Arrest when ready (shows rhythm selection immediately)\n\n" +
                            "3. Follow the 120-second cycle prompts\n\n" + // Changed from 10 to 120
                            "4. Select appropriate rhythm at each cycle\n\n" +
                            "5. Use the ROSC button if return of spontaneous circulation occurs\n\n" +
                            "6. Press END when resuscitation is complete" :
                            "1. Πατήστε ΕΝΑΡΞΗ για να ξεκινήσετε το χρονόμετρο\n\n" +
                            "2. Επιβεβαιώστε την Καρδιακή Ανακοπή όταν είστε έτοιμοι (εμφανίζει άμεσα την επιλογή ρυθμού)\n\n" +
                            "3. Ακολουθήστε τις οδηγίες του κύκλου των 120 δευτερολέπτων\n\n" + // Changed from 10 to 120
                            "4. Επιλέξτε τον κατάλληλο ρυθμό σε κάθε κύκλο\n\n" +
                            "5. Χρησιμοποιήστε το κουμπί Επιστροφής Κυκλοφορίας εάν επιστρέψει η αυθόρμητη κυκλοφορία\n\n" +
                            "6. Πατήστε ΤΕΛΟΣ όταν ολοκληρωθεί η ανάνηψη"}
                    </Text>
                </ScrollView>
                <TouchableOpacity onPress={() => setShowGuidesModal(false)}>
                    <Text style={modalStyles.modalOption}>{t('back')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default GuidesModal;