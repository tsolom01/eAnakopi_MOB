import { StyleSheet } from 'react-native';
import {scale} from "../../../../utils/scale";

export default StyleSheet.create({

settingOption: {
    flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginBottom: scale(20),
    },
    settingText: {
        fontSize: scale(18),
        color: 'white',
        flex: 1,
    },
    toggleButton: {
        padding: scale(10),
        borderRadius: scale(5),
        width: scale(80),
        alignItems: 'center',
    },
    toggleButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    languageButtons: {
        flexDirection: 'row',
    },
    languageButton: {
        padding: scale(10),
        marginHorizontal: scale(5),
        borderRadius: scale(5),
        backgroundColor: '#add8e6',
    },
    selectedLanguage: {
        backgroundColor: '#2ECC71',
    },
    languageButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        height: 48,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        marginVertical: 8,
    }
})
