import { StyleSheet } from 'react-native';
import { verticalMargin } from '../utils/scale';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: verticalMargin,
        paddingBottom: verticalMargin,
        backgroundColor: '#FFFFFF',
    },
    // Add other style objects related to HomeScreen here as needed
});