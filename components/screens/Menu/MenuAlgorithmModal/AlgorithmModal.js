import React, {useEffect, useState} from 'react';
import {    Modal,    ScrollView,    Text,    TouchableOpacity,    View , Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import {ERC_ALGORITHMS }   from './erc_algorithms';

import styles from './styles'; // local
import ImageZoom from 'react-native-image-pan-zoom';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "../../../../utils/scale";




export default function AlgorithmModal({
                                           visible,
                                           setShowAlgorithmsModal
                                       }) {
    const { t } = useTranslation();
    const [showAlgorithmImage, setShowAlgorithmImage] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);


    return (
        <Modal visible={visible} animationType="slide" transparent>
              <View style={styles.contentContainer}>
                  <View style={styles.header}>

                      <Text style={styles.headerText}> {t('ercAlgorithms')} </Text>
                  </View>

                <ScrollView >
                    <View>

                        {ERC_ALGORITHMS.map(({ id, labelKey }) => (
                            <TouchableOpacity style={styles.item} key={id} onPress={() => {setSelectedAlgorithm(id);
                                setShowAlgorithmImage(true) }} >
                                <Text style={styles.text}>{t(labelKey)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setShowAlgorithmsModal(false)} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </ScrollView>



            </View>
            {/* Algorithm Image Modal */}
            {showAlgorithmImage && (
                <Modal visible={true} transparent animationType="fade">
                    <View style={styles.algorithmImageModal}>
                        <TouchableOpacity
                            style={styles.closeAlgorithmImageButton}
                            onPress={() =>  setShowAlgorithmImage(false)}
                        >
                            <Text >X</Text>
                        </TouchableOpacity>


                        <ImageZoom
                            cropWidth={WINDOW_WIDTH}
                            cropHeight={WINDOW_HEIGHT}
                            imageWidth={WINDOW_WIDTH}
                            imageHeight={WINDOW_HEIGHT}
                            minScale={1}
                            maxScale={3}

                            style={styles.algorithmZoomContainer}
                        >

                            <Image
                                source={ ERC_ALGORITHMS.find(item => item.id === selectedAlgorithm).image  }
                                style={styles.algorithmImage}
                                resizeMode="contain"
                            />
                        </ImageZoom>
                    </View>
                </Modal>
            )}
        </Modal>
   )
};
