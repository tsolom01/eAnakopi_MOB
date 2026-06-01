import { StyleSheet } from 'react-native';
import {scale} from "../../utils/scale";

export default StyleSheet.create({
    button: {
        backgroundColor: '#add8e6',
        paddingVertical: scale(12),
        paddingHorizontal: scale(24),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(350),
        marginTop: scale(5),
    },
    text: {
        color: '#fff',
        fontSize: scale(18),
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: '#ccc',
    },

});