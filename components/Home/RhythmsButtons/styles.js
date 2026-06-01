import { StyleSheet } from 'react-native';
//import {scale} from "../../../../utils/scale";

export default StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    box: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#cccccc',
        minWidth: 60,
        alignItems: 'center',
    },
    selectedBox: {
        backgroundColor: '#ff3b30', // bright red for visibility
    },
    disabledBox: {
        opacity: 0.5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});