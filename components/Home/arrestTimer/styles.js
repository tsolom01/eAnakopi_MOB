import { StyleSheet } from 'react-native';
import { actionButtonStyle, actionButtonTextStyle } from '../../../styles/layout';

export default StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
    },
    startButton: {
        ...actionButtonStyle,
    },
    buttonText: {
        ...actionButtonTextStyle,
    },
});
