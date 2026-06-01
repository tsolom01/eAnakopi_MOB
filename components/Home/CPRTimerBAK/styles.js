        import { StyleSheet } from 'react-native';
        import {scale} from "../../../utils/scale";

        export default StyleSheet.create({
            cycleContainer: {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: scale(5),
            },
            cycleWrapper: {
                position: 'relative',
                width: scale(170),
                height: scale(170),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: scale(10),
            },

            circleContainer: {
                width: 200,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
            },
            CPRTimerText: {
                fontSize: scale(45),
                color: 'red',
                fontWeight: 'bold',
               // position: 'absolute',
            },
            cyclesCounterText: {
                marginTop: 8,
                fontSize: scale(20),
                color: '#333',
                fontWeight: '600',
                textAlign: 'center',
            },
            textWrapper: {
                position: 'absolute',
                top: 75, // adjust based on your circle size
                left: 0,
                right: 0,
                alignItems: 'center',
            },
            roscButton: {
                position: 'absolute',
                right: scale(-90),
                top: '0%',
                transform: [{ translateY: scale(-10) }],
                backgroundColor: '#2ECC71',
                paddingVertical: scale(10),
                paddingHorizontal: scale(20),
                borderRadius: scale(10),
            },
            roscText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: scale(18),
                textAlign: 'center',
            },

        })


