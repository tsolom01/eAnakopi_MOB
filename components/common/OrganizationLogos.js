import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';

const OrganizationLogos = () => (
    <View style={styles.footer}>
        <Image source={require('../../assets/images/appImages/okny_logo.png')} style={styles.logo} />
        <Image source={require('../../assets/images/appImages/university_logo.png')} style={styles.logo} />
        <Image source={require('../../assets/images/appImages/your_org_logo.png')} style={styles.logo} />
    </View>
);

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        paddingVertical: scale(6),
        paddingHorizontal: scale(12),
        borderTopWidth: 1,
        borderTopColor: '#E8ECF0',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: scale(70),
        height: scale(70),
        resizeMode: 'center'
    },
});

export default OrganizationLogos;
