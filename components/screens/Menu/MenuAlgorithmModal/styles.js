import { StyleSheet } from 'react-native';
import {scale,WINDOW_HEIGHT,WINDOW_WIDTH} from "../../../../utils/scale";

export default StyleSheet.create({
    algorithmsModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    algorithmOption: {
        fontSize: scale(14),
        textAlign: 'center',
        color: 'white',
        padding: scale(10),
        backgroundColor: '#add8e6',
        borderWidth: scale(2),
        borderColor: '#87CEFA',
        width: scale(300),
        marginBottom: scale(10),
        borderRadius: scale(5),
        alignSelf: 'center',  // This centers each option horizontally
    },
    algorithmsScrollView: {
        maxHeight: '75%',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
        height : '100%',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 10,
        fontSize: scale(16),
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
        paddingRight: 8,
        alignItems: 'center',

    },
    backButtonText: {
        fontSize: 26,
        color: '#007AFF', // iOS blue
    },
    algorithmImageModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },


// container passed to ImageZoom as the crop area
    algorithmZoomContainer: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
    },
// the image itself
    algorithmImage: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        //resizeMode: 'contain',
        //width: 100,
        //height: 100,
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderColor: 'red',
    },
// keep these if you still want the close button in the same spot
    closeAlgorithmImageButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },


});