import { StyleSheet } from 'react-native';
import { scale } from '../utils/scale';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
    },
    section: {
        width: '100%',
        alignItems: 'center',
        marginBottom: scale(30),
    },
    actionsSection: {
        gap: scale(4),
        marginBottom: scale(0),
    },
    cprSection: {
        marginTop: 0,
        marginBottom: scale(24),
    },
    rhythmsSection: {
        marginBottom: scale(24),
    },
    interventionsSection: {
        marginBottom: scale(0),
    },
    footerSafe: {
        backgroundColor: '#FFFFFF',
        paddingTop: scale(10),
        paddingBottom: scale(0),
    },
});
