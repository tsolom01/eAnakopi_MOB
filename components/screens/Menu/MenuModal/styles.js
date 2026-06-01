import { StyleSheet } from 'react-native';
import {scale} from "../../../../utils/scale";
export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)', // translucent background
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        elevation: 4,

        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 4},
    },
    reasonButton: {
        padding: 16,
        borderRadius: 10,

        marginBottom: 12,
    },
    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },

    description: {
        fontSize: scale(14),
        color: '#555',
        marginTop: 4,
    },
    success: {
        backgroundColor: '#d1f7d1',
    },
    error: {
        backgroundColor: '#fddddd',
    },

    info: {
        backgroundColor: '#ddeeff',
    },

    neutral: {
        backgroundColor: '#eeeeee',
    },
    cancelButton: {
        marginTop: 16,
        alignSelf: 'center',
        padding: 12,
    },

    cancelText: {
        color: '#007AFF',
        fontSize: scale(16)
    },
})