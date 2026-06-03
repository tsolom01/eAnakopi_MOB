import { StyleSheet } from 'react-native';
import { scale, moderateScale } from '../../../utils/scale';
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
        fontSize: moderateScale(40),
        color: 'red',
        fontWeight: 'bold',
        fontVariant: ['tabular-nums'],
        textAlign: 'center',
    },
    cyclesCounterText: {
        marginTop: scale(0),
        fontSize: moderateScale(40),
        color: 'red',
        fontWeight: '600',
        textAlign: 'center',
    },
});
