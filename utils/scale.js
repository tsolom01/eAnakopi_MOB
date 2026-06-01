import {  Dimensions} from 'react-native';

// Get device dimensions and define a scale factor based on a guideline width (telephone base)
//const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 500;
const isTablet = WINDOW_WIDTH>= 600;
const { height } = Dimensions.get('window');
export const verticalMargin = height * 0.05;
export const scale = size => (WINDOW_WIDTH/ guidelineBaseWidth) * size;
export const confirmButtonLeftOffset = isTablet ? scale(-129) : scale(-116);
export   { WINDOW_WIDTH ,WINDOW_HEIGHT};

