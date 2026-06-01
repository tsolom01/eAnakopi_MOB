        import { StyleSheet } from 'react-native';
        import {confirmButtonLeftOffset, scale} from "../../../utils/scale";

        export default StyleSheet.create({

            header: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: scale(10),
                marginTop: scale(-1),
                alignItems: 'center',
            },
            logo: {
                paddingTop: scale(70),
                width: scale(60),
                height: scale(60),
                resizeMode: 'contain',
                marginHorizontal: 0,
            },
            menuButton: {
                paddingTop: scale(10),
                backgroundColor: 'white',
                position: 'absolute',
                left: scale(20),
                top: '100%',
                zIndex: 999,
            },
            menuButtonText: {
                fontSize: scale(30),
                fontWeight: '200',
                color: '#333',
                textShadowColor: 'rgba(0,0,0,0.1)',
                textShadowOffset: { width: 0, height: scale(1) },
                textShadowRadius: scale(1),
                transform: [{ scaleY: 0.8 }],
            },
        })


