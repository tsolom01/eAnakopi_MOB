import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { actionButtonStyle, COLORS } from '../../styles/layout';

export default StyleSheet.create({
    button: {
        ...actionButtonStyle,
        backgroundColor: COLORS.accent,
        marginTop: scale(4),
        marginBottom: scale(2),
    },
    buttonCompact: {
        paddingVertical: scale(8),
    },
    text: {
        color: '#fff',
        fontSize: scale(18),
        fontWeight: '600',
        textAlign: 'center',
    },
    textCompact: {
        fontSize: scale(14),
        lineHeight: scale(17),
    },
    disabled: {
        backgroundColor: '#ccc',
    },

});