import   styles   from './styles';
import {Text, TouchableOpacity, View , Image} from "react-native";
import React from "react";


const Header = ({onMenuPress}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>

            <Image source={require('../../../assets/images/appImages/okny_logo.png')} style={styles.logo} />
            <Image source={require('../../../assets/images/appImages/your_org_logo.png')} style={styles.logo} />
            <Image source={require('../../../assets/images/appImages/university_logo.png')} style={styles.logo} />
        </View>
    );
};

export default Header;