import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { heartRhythms } from '../../../constants/rhythm/rhythmDefinitions'; // Adjust the path as needed
import { useCPRTimerStore } from '../../../stores/timerStore';

import styles from './styles'
import {useRhythmStore} from "../../../stores/rhythmStore";

const RhythmsButtons = () => {

    const selectedRhythm = useRhythmStore((state) => state.selectedRhythm);

    const isDisabled =false;

    // Convert object values to array for mapping
    const rhythmsArray = Object.values(heartRhythms);

    return (
        <View style={styles.container}>
            {rhythmsArray.map((rhythm) => (
                <TouchableOpacity
                    key={rhythm.id}
                    disabled={isDisabled}
                    style={[
                        styles.box,
                        selectedRhythm?.id === rhythm.id && styles.selectedBox,
                        isDisabled && styles.disabledBox,
                    ]}
                >
                    <Text
                        style={styles.text}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.65}
                    >
                        {rhythm.id}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default RhythmsButtons;