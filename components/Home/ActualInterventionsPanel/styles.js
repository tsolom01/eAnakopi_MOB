        import { StyleSheet } from 'react-native';
        import { scale } from '../../../utils/scale';

        export default StyleSheet.create({
            allMedicationContainer: {
                alignItems: 'center',
                width: '100%',
            },

            medicationButtonsContainer: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                width: '90%',
            },
            extraActionsSection: {
                width: '100%',
                alignItems: 'center',
                marginTop: scale(3),
                marginBottom: scale(4),
                gap: scale(4),
            },

            medicationButton: {
                alignItems: 'center',
                padding: scale(2),
            },
            medicationImage: {
                width: scale(90),
                height: scale(90),
                resizeMode: 'contain',
            },
            medicationButtonText: {
                fontSize: scale(12),
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: scale(3),
            },
            divider: {
                height: 1,
                backgroundColor: '#CCCCCC',
                marginVertical: 8,
                width: '100%',
            },
            moreButtonText: {
                color: '#007AFF', // iOS-style blue (or use your theme color)
                fontSize: scale(14),
                fontWeight: '500',
                textAlign: 'center',
                marginTop: 10,
            },
            modalOverlay: {
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
            },
            modalContent: {
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 12,
                width: '80%',
            },
            modalTitle: {
                fontSize: 18,
                marginBottom: 12,
            },
            textInput: {
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginBottom: 20,
            },
            modalButtons: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },

        })


