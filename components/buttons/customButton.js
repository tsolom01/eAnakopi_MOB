import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { t } from 'i18next';

export const CustomButton = ({
                          title,
                          onPress,
                          style,
                          textStyle,
                          disabled = false,
                          translate = false,
                          ...props
                      }) => {
    const displayText = translate ? t(title) : title;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                disabled && styles.disabled,
                style
            ]}
            activeOpacity={0.8}
            {...props}
        >
            <Text style={[styles.text, textStyle]}>
                {displayText}
            </Text>
        </TouchableOpacity>
    );
};