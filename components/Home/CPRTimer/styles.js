import { StyleSheet } from 'react-native';
import { scale } from '../../../utils/scale';
import { actionButtonStyle, actionButtonTextStyle } from '../../../styles/layout';

export default StyleSheet.create({
    cardiacArrestButton: {
        ...actionButtonStyle,
    },
    cardiacArrestButtonText: {
        ...actionButtonTextStyle,
    },
    cycleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    textOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CPRTimerText: {
        color: 'red',
        fontWeight: 'bold',
        fontVariant: ['tabular-nums'],
        textAlign: 'center',
    },
    cyclesCounterText: {
        color: 'red',
        fontWeight: '600',
        textAlign: 'center',
    },
});
