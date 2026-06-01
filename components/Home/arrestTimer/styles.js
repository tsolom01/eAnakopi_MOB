        import { StyleSheet } from 'react-native';
        import {confirmButtonLeftOffset, scale} from "../../../utils/scale";

        export default StyleSheet.create({

            timerContainer: {
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: scale(5),
            },
            arrestTimer: {
                fontSize: scale(50),
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
            },
            startButton: {
                marginBottom: scale(7),
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
            buttonText: {
                color: 'white',
                fontSize: scale(20),
                fontWeight: 'bold',
            },

        })


