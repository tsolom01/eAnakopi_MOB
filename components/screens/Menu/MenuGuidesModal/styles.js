import { StyleSheet } from 'react-native';
import {scale} from "../../../../utils/scale";

export default StyleSheet.create({

    guideContent: {
        width: '90%',
        maxHeight: '60%',
        marginBottom: scale(20),
    },
    guideText: {
        color: 'white',
        fontSize: scale(18),
        lineHeight: scale(30),
    },

})
