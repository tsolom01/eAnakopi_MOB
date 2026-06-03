import { StyleSheet } from 'react-native';
import { scale, moderateScale } from '../../../utils/scale';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '92%',
        alignSelf: 'center',
        gap: scale(10),
        marginVertical: 0,
    },
    box: {
        flex: 1,
        paddingVertical: scale(12),
        paddingHorizontal: scale(3),
        borderRadius: scale(8),
        backgroundColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: scale(36),
        minWidth: 0,
    },
    selectedBox: {
        backgroundColor: '#ff3b30',
    },
    disabledBox: {
        opacity: 0.5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        textAlign: 'center',
        width: '100%',
    },
});
