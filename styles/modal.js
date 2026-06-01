import { StyleSheet } from 'react-native';
import {scale} from "../utils/scale";

export default StyleSheet.create({
modalView: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalText: {
    fontSize: scale(25),
        width: '100%',
        textAlign: 'center',
        color: 'white',
        marginBottom: scale(20),
},
modalOption: {
    fontSize: scale(25),
        textAlign: 'center',
        color: 'white',
        padding: scale(10),
        backgroundColor: '#add8e6',
        borderWidth: scale(2),
        borderColor: '#87CEFA',
        width: scale(220),
        height: scale(60),
        marginBottom: scale(10),
        borderRadius: scale(5),
},
    }
)