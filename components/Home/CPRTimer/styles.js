        import { StyleSheet } from 'react-native';
        import {confirmButtonLeftOffset, scale,WINDOW_WIDTH} from "../../../utils/scale";

        export default StyleSheet.create({
            cycleContainer: {
                width: '100%',
                flexDirection: 'column', // <- Horizontal layout
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: scale(5),
            },
            cycleWrapper: {
                position: 'relative',
                width: WINDOW_WIDTH,
                height: scale(200),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: scale(45),
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
            cyclesCounterWrapper: {
                marginTop: scale(-40),
                position: 'relative',
                //bottom: 75, // adjust based on your circle size
                left: 0,
                right: 0,
                alignItems: 'center',
            },
            cyclesCounterText: {
                marginTop: scale(3),
                fontSize: scale(45),
                color: 'red',
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
            cardiacArrestButton: {
                marginBottom: scale(3),
                paddingVertical: scale(15),
                paddingHorizontal: scale(50),
                borderRadius: scale(8),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: scale(2) },
                shadowOpacity: 0.2,
                shadowRadius: scale(3),
                elevation: 3,
                alignItems: 'center',
            },
            cardiacArrestButtonText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: scale(20),
                textAlign: 'center',
            },

        })


