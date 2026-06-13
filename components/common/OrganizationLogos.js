import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { useHomeLayout } from '../../context/HomeLayoutContext';

const OrganizationLogos = () => {
    const { logoHeight, logoWideWidth } = useHomeLayout();

    return (
        <View style={styles.footer}>
            <Image
                source={require('../../assets/images/organisations/okny_logo.png')}
                style={[styles.logo, { width: logoHeight, height: logoHeight }]}
            />
            <Image
                source={require('../../assets/images/organisations/university_logo.png')}
                style={[styles.logoWide, { width: logoWideWidth, height: logoHeight }]}
            />
            <Image
                source={require('../../assets/images/organisations/your_org_logo.png')}
                style={[styles.logo, { width: logoHeight, height: logoHeight }]}
            />
        </View>
    );
};

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
        resizeMode: 'contain',
    },
    logoWide: {
        resizeMode: 'contain',
    },
});

export default OrganizationLogos;
