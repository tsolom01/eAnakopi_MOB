import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    body: {
        flex: 1,
        minHeight: 0,
    },
    mainContent: {
        flex: 1,
        minHeight: 0,
        width: '100%',
        justifyContent: 'space-between',
    },
    section: {
        width: '100%',
        alignItems: 'center',
        flexShrink: 1,
    },
    actionsSection: {},
    interventionsSection: {
        flexShrink: 1,
    },
    footerSafe: {
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
    },
});
